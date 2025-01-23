import { BasicCheckBox } from "@/components/buttons/basicCheckBox";
import useTaskStore from "@/Context/taskStore";
import { dateToIso } from "@/utils/dateUtils";
import { useEditObject } from "@/utils/others/editObject";
import { useTask } from "@/utils/Task/taskHandler";
import { useState } from "react";

// タスクを編集する時の表示するサイドバー
interface EditTaskSidebarProps {
    isEdit:boolean
}
export const EditTaskSidebar:React.FC<EditTaskSidebarProps> = ({isEdit}) => {
  const editingTask = useTaskStore((state) => state.editingTask)!;
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const editOrCreate = isEdit ? "edit" : "create";
  const updateTask = useTask();
  const [due,setDue] = useState<boolean>(false)
  const handleEditTask = useEditObject(editingTask,setEditingTask)


  const toggleDue = () =>{
    setDue((prev)=>!prev)
  }
  const toggleShare = () =>{
    const newShare = !editingTask.share
    setEditingTask({...editingTask,share:newShare})
  }
  return (
    <div>
      {editingTask && (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            updateTask(editOrCreate);
          }}
        >
          <h1>タスク作成</h1>

          <input
            type="text"
            placeholder="タスクを入力"
            value={editingTask.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleEditTask(e)
            }}
          />
          <input
            type="text"
            placeholder="説明を入力"
            value={editingTask.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleEditTask(e)
            }}
          />
          <input
            type="theme"
            placeholder="テーマを入力"
            value={editingTask.theme}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleEditTask(e)
            }}
          />

          <BasicCheckBox checked={editingTask.share} onClick={()=>toggleShare()}/>
          <BasicCheckBox checked={due} onClick={toggleDue}/>

          {due && (
            <input
              type="date"
              placeholder="期日を入力"
              value={dateToIso(editingTask.dueDate)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleEditTask(e)
              }}
            />
          )}
          <button type="submit">タスクを登録</button>
        </form>
      )}
    </div>
  );
};
