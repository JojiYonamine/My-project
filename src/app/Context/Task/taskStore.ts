// タスク機能の状態管理用

import { Task } from "@/types/taskTypes";
import { timestampToDate } from "@/utils/others/dateUtils";
import { tasksRef } from "@/utils/others/firestoreRefs";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { create } from "zustand";

interface taskStore {
  tasks: Task[];
  initializeTask: (cid: string) => () => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  filteredTasks: Task[]|null;
  setFilteredTasks: (tasks: Task[]|null) => void;
}

const useTaskStore = create<taskStore>((set) => ({
  // フィルター前のタスク
  tasks: [],
  initializeTask: (cid) => {
    const q = query(tasksRef(cid), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks: Task[] = snapshot.docs.map((doc) => ({
        taskId: doc.id,
        title: doc.data().title,
        createdBy: doc.data().createdBy,
        createdAt: timestampToDate(doc.data().createdAt)!,
        themeId: doc.data().themeId,
        dueDate: timestampToDate(doc.data().dueDate),
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
