// タスクの作成・編集・完了状態の変更
// 作成時、action='create'で呼び出す
// 編集時、action='edit'で呼び出す
// 完了状態更新時 action='complete'で呼び出す。値を渡さなくても、doneを反転させるようにしてる
// 終了時 action='delete'で呼び出す

import useAuthStore from "@/Context/authStore";
import useTaskStore from "@/Context/Task/taskStore";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { taskRef, tasksRef } from "../others/firestoreRefs";
import { Task } from "@/types/taskTypes";

export const useTask = () => {
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const currentCid = useAuthStore((state) => state.currentCid)!;

  const taskHandler = async (action: "create" | "edit" | "delete" | "complete", task: Task) => {
    // 参照を作成
    const ref = action === "create" ? doc(tasksRef(currentCid)) : taskRef(currentCid, task?.taskId!);

    const newTask: Task = {
      ...task!,
      taskId: action === "create" ? ref.id : task?.taskId,
    };

    try {
      if (action === "delete") {
        await deleteDoc(ref);
        alert("タスクを削除しました");
        return 
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
