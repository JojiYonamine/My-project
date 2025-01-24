// タスクテーマの管理をする

import useTaskThemeStore from "@/Context/Task/taskThemeStore";
import { taskThemeRef, taskThemesRef } from "../others/firestoreRefs";
import useAuthStore from "@/Context/authStore";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { TaskTheme } from "@/types/taskTypes";

export const useTaskTheme = (action: "create" | "edit" | "delete") => {
  const { editingTheme, setEditingTheme } = useTaskThemeStore();
  const currentCid = useAuthStore((state) => state.currentCid)!;

  //   参照を作成
  const ref =
    action === "create" ? doc(taskThemesRef(currentCid)) : taskThemeRef(currentCid, editingTheme?.taskThemeId!);

  const newTheme: TaskTheme = {
    ...editingTheme!,
    taskThemeId: action === "create" ? ref.id : editingTheme?.taskThemeId,
  };

  const themeHandler = async () => {
    try {
      if (action === "delete") {
        await deleteDoc(ref);
        alert("タスクを削除しました");
      } else {
        await setDoc(ref, newTheme);
        alert("タスクを更新しました");
      }
      setEditingTheme(null);
    } catch (err: unknown) {
      console.log(err, "themeHandlerでエラー");
    }
  };
  return themeHandler;
};
