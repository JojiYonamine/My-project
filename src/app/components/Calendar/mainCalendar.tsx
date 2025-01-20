// カレンダー本体を表示する部分

import "react-big-calendar/lib/css/react-big-calendar.css";
import { calendarEvent } from "@/types/calendarTypes";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { ja } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo, View } from "react-big-calendar";
import useAuthStore from "@/Context/authStore";
import useCalendarStore from "@/Context/calendarStore";
import { CalendarHeader } from "./calendarHeader";

export const MainCalendar: React.FC = () => {
  const locales = {
    ja: ja,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  const loading = useAuthStore((state) => state.loading);
  const cid = useAuthStore((state) => state.currentCid);
  const uid = useAuthStore((state)=>state.currentUser)!.uid
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<View>("month");
  const handleNavigate = (newDate: Date) => {
    console.log(newDate);
    setCurrentDate(newDate);
  };
  const { events, selectedCalendar, setSelectedEvent, initializeEvents } =
    useCalendarStore();

  const handleViewChange = (newView: View) => {
    setCurrentView(newView);
  };

  // イベントを選択
  const handleSelectEvent = (e: calendarEvent) => {
    console.log(e)
    setSelectedEvent(e);
  };

  const handleSelectSlot = (e:SlotInfo) =>{
    const newEvent: calendarEvent = {
      eventId: "",
      title: "",
      createdBy: uid,
      createdAt: new Date(),
      allDay: true,
      start: e.start,
      end: e.start,
      color: "",
    };
    setSelectedEvent(newEvent)
  }

  // イベントリスナーの開始終了
  useEffect(() => {
    if (loading || !selectedCalendar || !cid) return;
    console.log("イベント、リスナー開始");
    const unsubcribe = initializeEvents(cid, selectedCalendar.calendarId);
    return () => {
      unsubcribe();
      console.log("イベント、リスナー解除");
    };
  }, [selectedCalendar]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        date={currentDate}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        selectable
        onSelectSlot={handleSelectSlot}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        view={currentView}
        style={{ height: 500, width: "100%" }}
        components={{
          toolbar: CalendarHeader, // カスタムツールバーを適用
        }}
      />
    </div>
  );
};
