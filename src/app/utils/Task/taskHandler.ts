// タスクの作成・編集・完了状態の変更
// 作成時、action='create'で呼び出す
// 編集時、action='edit'で呼び出す
// 完了状態更新時 action='complete'で呼び出す。値を渡さなくても、doneを反転させるようにしてる
// 終了時 action='delete'で呼び出す

import useAuthStore from "@/Context/authStore";
import useTaskStore from "@/Context/taskStore";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { taskRef, tasksRef } from "../firestoreRefs";
import { Task } from "@/types/taskTypes";
import { useEffect } from "react";
import { validateTask } from "./validateTask";

export const useTask = (editingTaskProp?: Task) => {
  const editingTask = useTaskStore((state) => state.editingTask);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const currentCid = useAuthStore((state) => state.currentCid)!;

  //   タスクプロップがある時に代入
  useEffect(() => {
    if (editingTaskProp && !editingTask) {
      setEditingTask(editingTaskProp);
    }
  }, [editingTaskProp]);

  const taskHandler = async (
    action: "create" | "edit" | "delete" | "complete"
  ) => {

    // バリデーション
    const errors = validateTask(editingTask);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // 参照を作成
    const ref =
      action === "create"
        ? doc(tasksRef(currentCid))
        : taskRef(currentCid, editingTask?.taskId!);

    const newTask: Task = {
      ...editingTask!,
      taskId: action === "create" ? ref.id : editingTask?.taskId,
    };
    try {
      if (action === "delete") {
        await deleteDoc(ref);
        alert("タスクを削除しました");
      }
      if (action === "complete") {
        const doneStatus = !newTask?.done;
        await updateDoc(ref, { done: doneStatus });
      } else {
        await setDoc(ref, newTask);
        alert("タスクを更新しました");
      }
      setEditingTask(null);
    } catch (err: unknown) {
      console.log(err, "taskHandlerでエラー");
    }
  };

  return taskHandler;
};
