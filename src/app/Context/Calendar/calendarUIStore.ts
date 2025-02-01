import { create } from "zustand";

interface calendarUIStore {
  // サイドバーの開閉状態
  sidebarOpen: boolean;
  // サイドバーの開閉を行う
  setSidebarOpen: (open: boolean) => void;
  // イベントの作成時に編集か作成かを表す
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
}

const useCalendarUIStore = create<calendarUIStore>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  isEdit: false,
  setIsEdit: (isEdit) => set({ isEdit: isEdit }),
}));

export default useCalendarUIStore;
