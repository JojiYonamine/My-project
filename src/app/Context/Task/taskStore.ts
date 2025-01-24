// タスク機能の状態管理用

import { Task, TaskTheme } from "@/types/taskTypes";
import { tasksRef, taskThemesRef } from "@/utils/others/firestoreRefs";
import { onSnapshot } from "firebase/firestore";
import { create } from "zustand";

interface taskStore {
  tasks: Task[];
  initializeTask: (cid: string) => () => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  filteredTasks: Task[];
  setFilteredTasks: (tasks: Task[]) => void;
}

const useTaskStore = create<taskStore>((set) => ({
  // フィルター前のタスク
  tasks: [],
  initializeTask: (cid) => {
    const unsubscribe = onSnapshot(tasksRef(cid), (snapshot) => {
      const tasks: Task[] = snapshot.docs.map((doc) => ({
        taskId: doc.id,
        title: doc.data().title,
        createdBy: doc.data().createdBy,
        createdAt: doc.data().createdAt,
        themeId: doc.data().themeId,
        dueDate: doc.data().dueDate,
        share: doc.data().share,
        description: doc.data().description,
        done: doc.data().done,
      }));
      set({ tasks: tasks });
    });
    return unsubscribe;
  },

  //   編集中のタスク・新規作成時にも使う
  editingTask: null,
  setEditingTask: (task) => set({ editingTask: task }),

  //   フィルター後のタスク
  filteredTasks: [],
  setFilteredTasks: (tasks) => set({ filteredTasks: tasks }),
}));

export default useTaskStore;
