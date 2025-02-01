// カレンダーの表示状態を管理する

import { View } from "react-big-calendar";
import { create } from "zustand";

interface showCalendarStore {
    // 表示している日付
    currentDate:Date;
    setCurrentDate:(date:Date)=>void;
    // 表示している状態
    currentView:View
    setCurrentView:(view:View) =>void
}
const today = new Date()
const useShowCalendarStore = create<showCalendarStore>((set)=>({
    currentDate:today,
    setCurrentDate:(date)=>set({currentDate:date}),
    currentView:"month",
    setCurrentView:(view)=>set({currentView:view})
}))

export default useShowCalendarStore