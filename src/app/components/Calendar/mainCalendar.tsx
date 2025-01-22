// カレンダー本体を表示する部分

import "react-big-calendar/lib/css/react-big-calendar.css";
import { calendarEvent } from "@/types/calendarTypes";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { ja } from "date-fns/locale";
import { useEffect } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import useAuthStore from "@/Context/authStore";
import useCalendarStore from "@/Context/calendarStore";
import useShowCalendarStore from "@/Context/showCalendarStore";
// import { CalendarHeader } from "./calendarHeader";

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
  const uid = useAuthStore((state) => state.currentUser)!.uid;
  const {currentDate,currentView} = useShowCalendarStore()
  const {
    events,
    selectedCalendar,
    setSelectedEvent,
    initializeEvents,
    setIsEdit,
  } = useCalendarStore();

  // 表示を変更

  // イベントを選択
  const handleSelectEvent = (e: calendarEvent) => {
    setSelectedEvent(e);
    setIsEdit(true);
  };

  // 空スロットを選択
  const handleSelectSlot = (e: SlotInfo) => {
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
    setSelectedEvent(newEvent);
    setIsEdit(false);
  };

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

  // イベントの色を取得
  const eventColorGetter = (event: calendarEvent) => {
    return {
      style: {
        backgroundColor: event.color || "#ff7fbf",
      },
    };
  };

  return (
      <Calendar
        localizer={localizer}
        events={events}
        date={currentDate}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        selectable
        onSelectSlot={handleSelectSlot}
        view={currentView}
        style={{ height:"100%", width: "100%" }}
        eventPropGetter={eventColorGetter}
        toolbar={false}
      />
  );
};
