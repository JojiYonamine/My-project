"use client";
import { RequireAuth } from "@/components/RequireAuth";
import { useCouple } from "@/Context/Couple-modified";
import { TaskShowing } from "@/types/types";
import { dateToIso, IsoToDate } from "@/utils/dateUtils";
import { addTask } from "@/utils/Task/addTask";
import { fetchTasks } from "@/utils/Task/fetchTask";
import { updateDone, updateTask } from "@/utils/Task/updateTask";
import {
  ensureCid,
  ensureString,
  ensureTask,
  ensureTasks,
  ensureUser,
} from "@/utils/typeGare";
import { useEffect, useState } from "react";

const Task = () => {
  const cid = useCouple().cid;
  const user = useCouple().user;
  ensureUser(user);
  ensureCid(cid);
  const owner = user.uid;

  const [title, setTitle] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [share, setShare] = useState<boolean>(false);
  const [due, setdue] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(
    undefined
  );

  const [tasks, setTasks] = useState<TaskShowing[] | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [update, setUpdate] = useState<boolean>(false);

  const [editedTask, setEditedTask] = useState<TaskShowing | null>(null);


  // ボックス変更用
  const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "share") {
      setShare(e.target.checked);
      return;
    }
    if (e.target.name == "due") {
      setdue(e.target.checked);
      return;
    }
  };

//   done変更用
  const handleUpdateDone = async (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name,checked} = e.target
    await updateDone(cid,name,checked)
    setUpdate(!update)
  }

  // タスク追加
  const addNewTask = async () => {
    await addTask(cid, {
      title: title,
      createdBy: owner,
      createdAt: new Date(),
      theme: theme,
      due: due,
      dueDate: dueDate,
      share: share,
      description: description,
      done: false,
    });
    setTitle("");
    setDescription("");
    setTheme("");
    setUpdate(!update);
  };

  // タスク取得
  useEffect(() => {
    fetchTasks(cid).then(setTasks);
  }, [cid, update]);

  //タスク編集の方針
  //title,doneはそのまま編集、その他は開いて編集

  const handleSelectTask = (task: TaskShowing) => {
    setSelectedTaskId(task.taskId);
    setEditedTask(task);
  };

  const handleEditTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    ensureString(editedTask?.taskId);
    if (name == "share") {
      setEditedTask({ ...editedTask, share: checked });
      return;
    }
    if (name == "due") {
      setEditedTask({ ...editedTask, due: checked });
      return;
    }
    if (name == "duedate") {
      setEditedTask({ ...editedTask, dueDate: IsoToDate(value) });
      return;
    }
    setEditedTask({ ...editedTask, [name]: value });
  };

  //   編集したタスクを反映させる
  const handleUpdateTask = async () => {
    ensureTask(editedTask);
    setEditedTask(null);
    await updateTask(cid, editedTask);
    setUpdate(!update);
  };

  return (
    <div>
      {/* タスク表示 */}
      <div>
        {tasks && (
          <div>
            {selectedTaskId && editedTask ? (
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  handleUpdateTask();
                }}
              >
                <h1>タスク編集画面</h1>
                <input
                  type="text"
                  placeholder="タイトルを入力"
                  name="title"
                  value={editedTask.title}
                  onChange={handleEditTask}
                />
                <input
                  type="text"
                  placeholder="説明"
                  name="description"
                  value={editedTask.description}
                  onChange={handleEditTask}
                />
                <input
                  type="text"
                  placeholder="テーマを入力"
                  name="theme"
                  value={editedTask.theme}
                  onChange={handleEditTask}
                />
                <label>
                  <input
                    type="checkbox"
                    name="share"
                    checked={editedTask.share}
                    onChange={handleEditTask}
                  />
                  共有
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="due"
                    checked={editedTask.due}
                    onChange={handleEditTask}
                  />
                  期限
                </label>

                {editedTask.due && (
                  <input
                    type="date"
                    placeholder="期日を入力"
                    name="duedate"
                    value={dateToIso(dueDate)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setDueDate(IsoToDate(e.target.value));
                    }}
                  />
                )}
                <button type="submit">更新</button>
              </form>
            ) : (
              <div>
                <h1>タスクリスト</h1>
                {tasks.map((task) => (
                  <li key={task.taskId}>
                    <label>
                        <input
                        type="checkbox"
                        checked={task.done}
                        name={task.taskId}
                        onChange = {
                            (e: React.ChangeEvent<HTMLInputElement>) => {handleUpdateDone(e)}}
                        />
                    </label>
                    {task.title}
                    <button
                      onClick={() => {
                        handleSelectTask(task);
                      }}
                    >
                      編集
                    </button>
                  </li>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 新規タスク作成 */}
      {!editedTask && (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            addNewTask();
          }}
        >
          <h1>タスク作成</h1>
          <input
            type="text"
            placeholder="タスクを入力"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="説明を入力"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
          />
          <input
            type="theme"
            placeholder="テーマを入力"
            value={theme}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTheme(e.target.value);
            }}
          />
          <label>
            <input
              type="checkbox"
              name="share"
              checked={share}
              onChange={handleChangeCheckBox}
            />
            共有
          </label>
          <label>
            <input
              type="checkbox"
              name="due"
              checked={due}
              onChange={handleChangeCheckBox}
            />
            期限
          </label>

          {due && (
            <input
              type="date"
              placeholder="期日を入力"
              value={dateToIso(dueDate)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDueDate(IsoToDate(e.target.value));
              }}
            />
          )}
          <button type="submit">タスクを登録</button>
        </form>
      )}
    </div>
  );
};

// export default Task
const TaskFeat = () => {
  return (
    <RequireAuth>
      <Task />
    </RequireAuth>
  );
};

export default TaskFeat;
