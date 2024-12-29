"use client";
import { RequireAuth } from "@/components/RequireAuth";
import { useCouple } from "@/Context/Couple-modified";
import { internalTask, TaskShowing } from "@/types/types";
import { dateToIso, IsoToDate } from "@/utils/dateUtils";
import { addTask } from "@/utils/Task/addTask";
import { deleteTask } from "@/utils/Task/deleteTask";
import { fetchTasks } from "@/utils/Task/fetchTask";
import { getThemes } from "@/utils/Task/getThemes";
import { updateDone, updateTask } from "@/utils/Task/updateTask";
import {
  ensureCid,
  ensureString,
  ensureTask,
  ensureUser,
} from "@/utils/typeGare";
import { useEffect, useState } from "react";

const Task = () => {
  // type doneCriterion = "all"|"done"|"undone"

  // 認証用の状態
  const cid = useCouple().cid;
  const user = useCouple().user;
  ensureUser(user);
  ensureCid(cid);
  const owner = user.uid;

  // タスク作成用の状態
  const [title, setTitle] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [share, setShare] = useState<boolean>(false);
  const [due, setdue] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<TaskShowing[]>([]);

  // タスク編集用の状態
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<TaskShowing | null>(null);

  // フィルター用の状態
  const [themes, setThemes] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [doneCriterion, setDoneCriterion] = useState<string>("all");

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

  // done変更用
  const handleUpdateDone = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    await updateDone(cid, name, checked);
    setTasks((prevTasks: TaskShowing[]) => {
      if (!prevTasks) return [];
      else {
        return prevTasks.map((task) =>
          task.taskId === name ? { ...task, done: checked } : task
        );
      }
    });
  };

  // タスクをfirestoreに追加、ローカルのtasksにも追加
  const addNewTask = async () => {
    const newTask: internalTask = {
      title: title,
      createdBy: owner,
      createdAt: new Date(),
      theme: theme,
      due: due,
      dueDate: dueDate,
      share: share,
      description: description,
      done: false,
    };

    const newId: string | undefined = await addTask(cid, newTask);

    if (newId) {
      const NewTask: TaskShowing = { ...newTask, taskId: newId };
      setTasks((prevTasks: TaskShowing[]) =>
        prevTasks ? [...prevTasks, NewTask] : [NewTask]
      );
    } else {
      alert("タスクの追加に失敗しました");
    }
    setTitle("");
    setDescription("");
    setTheme("");
  };

  // タスク取得(初回のみ)
  useEffect(() => {
    fetchTasks(cid).then(setTasks);
  }, [cid]);

  // テーマ更新
  useEffect(() => {
    console.log("theme updated");
    if (tasks) setThemes(getThemes(tasks));
  }, [cid, tasks]);

  //タスク編集の方針
  //title,doneはそのまま編集、その他は開いて編集
  const handleSelectTask = (task: TaskShowing) => {
    setSelectedTaskId(task.taskId);
    setEditedTask(task);
  };

  //   タスク編集
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

  //   編集したタスクを反映
  const handleUpdateTask = async () => {
    ensureTask(editedTask);
    if (editedTask.theme === "") {
      setEditedTask({ ...editedTask, theme: "テーマなし" });
    }
    setTasks((prevTasks: TaskShowing[]) => {
      if (!prevTasks) return [];
      else {
        return prevTasks.map((task) =>
          task.taskId === editedTask.taskId ? { ...task, ...editedTask } : task
        );
      }
    });
    setEditedTask(null);
    await updateTask(cid, editedTask);
  };

  //   タスク削除
  const handleDeleteTask = async (task: TaskShowing) => {
    await deleteTask(cid, task);
    const newTasks = tasks.filter(
      (prev: TaskShowing) => prev.taskId !== task.taskId
    );
    setTasks(newTasks);
  };

  // 終了・テーマのフィルター
  const doneThemeFilter = (
    tasks: TaskShowing[],
    selectedThemes: string[],
    criterion: string
  ): TaskShowing[] => {
    switch (criterion) {
      case "done":
        const doneTasks = tasks.filter((task: TaskShowing) => task.done);
        return doneTasks.filter((doneTask: TaskShowing) =>
          selectedThemes.includes(doneTask.theme)
        );
      case "undone":
        const undoneTasks = tasks.filter((task: TaskShowing) => !task.done);
        return undoneTasks.filter((undoneTask: TaskShowing) =>
          selectedThemes.includes(undoneTask.theme)
        );
      case "all":
        return tasks.filter((task: TaskShowing) =>
          selectedThemes.includes(task.theme)
        );
      default:
        return tasks;
    }
  };

  // テーマの複数選択用
  const toggleThemeSelect = (theme: string) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes((prev) => prev.filter((t) => t !== theme));
    } else {
      setSelectedThemes((prev) => [...prev, theme]);
    }
  };

  // 全選択・解除
  const handleSelectAll = () => {
    if (selectedThemes.length == themes.length) setSelectedThemes([]);
    else setSelectedThemes(themes);
  };

  return (
    <div>
      {/* 終了フィルター */}
      <div>
        <h1>終了フィルター</h1>
        <select
          value={doneCriterion}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setDoneCriterion(e.target.value);
          }}
        >
          <option value="all">全て</option>
          <option value="undone">未完了</option>
          <option value="done">完了</option>
        </select>
      </div>

      {/* テーマフィルター */}
      <div>
        <h1>テーマフィルター</h1>
        <button onClick={handleSelectAll}>全選択</button>
        {themes.map((theme) => (
          <label key={theme}>
            <input
              type="checkbox"
              checked={selectedThemes.includes(theme)}
              value={theme}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                toggleThemeSelect(e.target.value);
              }}
            />
            {theme}
          </label>
        ))}
      </div>

      {/* タスク表示 */}
      <div>
        {tasks && (
          <div>
            {selectedTaskId && editedTask ? (
              // タスク編集
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
                {/* <select multiple>
                  doneThemeFilter(tasks,selectedThemes,doneCriterion)
                </select> */}
                {(selectedThemes.length!==0)&&(doneThemeFilter(tasks, selectedThemes, doneCriterion).map(
                  (task) => (
                    <li key={task.taskId}>
                      <label>
                        <input
                          type="checkbox"
                          checked={task.done}
                          name={task.taskId}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleUpdateDone(e);
                          }}
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
                      <button
                        onClick={() => {
                          handleDeleteTask(task);
                        }}
                      >
                        削除
                      </button>
                    </li>
                  )
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
