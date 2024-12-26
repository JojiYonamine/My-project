'use client'
import { RequireAuth } from "@/components/RequireAuth"
import { useCouple } from "@/Context/Couple-modified";
import { TaskShowing } from "@/types/types";
import { dateToIso, IsoToDate } from "@/utils/dateUtils";
import { addTask } from "@/utils/Task/addTask";
import { fetchTasks } from "@/utils/Task/fetchTask";
import { ensureCid, ensureUser } from "@/utils/typeGare";
import { useEffect, useState } from "react"


const Task = () => {
    const cid = useCouple().cid;
    const user = useCouple().user;
    ensureUser(user);
    ensureCid(cid);
    const owner = user.uid;
    
    const [title,setTitle] = useState<string>("")
    const [theme,setTheme] = useState<string>("")
    const [description,setDescription] = useState<string>("")
    const [share,setShare] = useState<boolean>(false)
    const [due,setdue] = useState<boolean>(false)
    const [dueDate,setDueDate] = useState<Date>(new Date())
    const [selectedTheme,setSelectedTheme] = useState<string|undefined>(undefined)

    const [tasks,setTasks] = useState<TaskShowing[]|null>(null)
    const [selectedTask,setSelectedTask] = useState<string|undefined>(undefined)
    const [update,setUpdate] = useState<boolean>(false)

    // ボックス変更用
    const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name=="share"){
            setShare(e.target.checked);
            return
        }if(e.target.name=="due"){
            setdue(e.target.checked)
            return
        }
    };

    // タスク追加
    const addNewTask = async () => {
        await addTask(cid,{
            title:title,
            createdBy:owner,
            createdAt:new Date(),
            theme:theme,
            dueDate:dueDate,
            share:share,
            description:description
        })
        setTitle("")
        setDescription("")
        setTheme("")
        setUpdate(!update)
    }

    // タスク取得
    useEffect(() => {
        fetchTasks(cid).then(setTasks)
    },[cid,update])


    return(
        <div>
            {/* タスク表示 */}
            <div>
                {tasks&&(
                    <div>
                        <h1>タスクリスト</h1>
                        <ul>
                            {tasks.map((task)=>(
                                <li key={task.taskId}>
                                    {task.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                )}
            </div>
            {/* タスク入力 */}
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                          e.preventDefault();
                          addNewTask();
                        }}>
                <input
                type='text'
                placeholder="タスクを入力"
                value = {title}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}/>
                <input
                type='text'
                placeholder="説明を入力"
                value = {description}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setDescription(e.target.value)}}/>
                <input
                type='theme'
                placeholder="テーマを入力"
                value = {theme}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setTheme(e.target.value)}}/>
                <label>
                <input
                type="checkbox"
                name='share'
                checked={share}
                onChange={handleChangeCheckBox}
              />共有
                </label>
                <label>
                <input
                type="checkbox"
                name='due'
                checked={due}
                onChange={handleChangeCheckBox}
              />期限
                </label>

              {due&&(
                <input
                type='date'
                placeholder="期日を入力"
                value = {dateToIso(dueDate)}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setDueDate(IsoToDate(e.target.value))}}/>
              )}
              <button type='submit'>タスクを登録</button>
            </form>
        </div>
    )
}

// export default Task
const TaskFeat = () =>{
    return(
    <RequireAuth>
        <Task/>
    </RequireAuth>
    )

}

export default TaskFeat