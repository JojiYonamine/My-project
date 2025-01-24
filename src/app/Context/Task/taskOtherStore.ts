// タスク機能の状態の細かなものを管理する
import { create } from "zustand";
type doneCriterion = "all" | "undone" | "done";

interface taskOtherStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  doneCriterion: doneCriterion;
  setDoneCriterion: (criterion: doneCriterion) => void;
  isEdit:"edit"|"create"|null
  setIsEdit:(isEdit:"edit"|"create"|null)=>void
}

const useTaskOtherStore = create<taskOtherStore>((set) => ({
  // 完了状態によるフィルター
  doneCriterion: "all",
  setDoneCriterion: (criterion) => set({ doneCriterion: criterion }),

  //   タスクサイドバーの開閉
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  isEdit:null,
  setIsEdit:(isEdit)=>set({isEdit:isEdit})
}));


export default useTaskOtherStore;
