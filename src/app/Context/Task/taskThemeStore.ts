// タスクのテーマ全般の状態を管理する

import { TaskTheme } from "@/types/taskTypes";
import { timestampToDate } from "@/utils/others/dateUtils";
import { taskThemesRef } from "@/utils/others/firestoreRefs";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { create } from "zustand";

interface taskThemeStore {
  taskThemes: TaskTheme[];
  setTaskThemes: (theme: TaskTheme[]) => void;
  initializeTaskThemes: (cid: string) => () => void;
  selectedThemes: TaskTheme[];
  setSelectedThemes: (themes: TaskTheme[]) => void;
  editingTheme: TaskTheme | null;
  setEditingTheme: (theme: TaskTheme | null) => void;
}

const useTaskThemeStore = create<taskThemeStore>((set) => ({
  // テーマ全体
  taskThemes: [],
  setTaskThemes: (themes) => set({ taskThemes: themes }),
  initializeTaskThemes: (cid) => {
    const q = query(taskThemesRef(cid), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapShot) => {
      const themes: TaskTheme[] = snapShot.docs.map((doc) => ({
        taskThemeId: doc.id,
        name: doc.data().name,
        color: doc.data().color,
        share: doc.data().share,
        icon: doc.data().icon,
        createdAt: timestampToDate(doc.data().createdAt)!,
      }));
      set({ taskThemes: themes });
    });
    return unsubscribe;
  },

  //   選択中のテーマ
  selectedThemes: [],
  setSelectedThemes: (themes) => set({ selectedThemes: themes }),

  //   編集中のテーマ
  editingTheme: null,
  setEditingTheme: (theme) => set({ editingTheme: theme }),
}));

export default useTaskThemeStore;
