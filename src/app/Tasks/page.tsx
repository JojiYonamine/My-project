"use client";
import { RequireAuth } from "@/components/RequireAuth";
import { EditTaskSidebar } from "@/components/Task/editSidebar/EditTaskSidebar";
import { TaskSidebar } from "@/components/Task/sidebar-filter/TaskSIdebar";
import { TaskList } from "@/components/Task/taskList/taskList";
import { useCouple } from "@/Context/Couple-modified";
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
  const [editedTask, setEditedTask] = useState<TaskShowing | null>(null);

  // フィルター用の状態

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
    try {
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
    } catch (err: unknown) {
      alert(`更新に失敗しました、${err}`);
    }
  };

  // タスク取得(初回のみ)
  useEffect(() => {
    fetchTasks(cid).then(setTasks);
  }, [cid]);

  // テーマ更新
  useEffect(() => {
    if (tasks) setThemes(getThemes(tasks));
  }, [cid, tasks]);

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


  return (
    <RequireAuth>
      {/* サイドバー、フィルターを表示する */}
      <TaskSidebar/>
      {/* タスク表示 */}
      <TaskList/>

      {/* 新規タスク作成 */}
      <EditTaskSidebar isEdit={true}/>
    </RequireAuth>
  );
};

export default Task;
