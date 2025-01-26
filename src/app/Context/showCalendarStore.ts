import { View } from "react-big-calendar";
import { create } from "zustand";

interface showCalendarStore {
    currentDate:Date;
    setCurrentDate:(date:Date)=>void;
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