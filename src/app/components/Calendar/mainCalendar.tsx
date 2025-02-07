// カレンダー本体を表示する部分
import "react-big-calendar/lib/css/react-big-calendar.css";
import { calendarEvent } from "@/types/calendarTypes";
import { addMonths, format, getDay, parse, startOfWeek, subMonths } from "date-fns";
import { ja } from "date-fns/locale";
import { useEffect, useMemo } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import useAuthStore from "@/Context/authStore";
import useCalendarStore from "@/Context/Calendar/calendarStore";
import useShowCalendarStore from "@/Context/Calendar/showCalendarStore";
import useCalendarEventStore from "@/Context/Calendar/calendarEventStore";
import useCalendarUIStore from "@/Context/Calendar/calendarUIStore";
import { expandRepeatedEvent } from "@/utils/Calendar/repeatedEvent";

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
  const { currentDate, currentView } = useShowCalendarStore();
  const { events, setSelectedEvent,initializeEvents} = useCalendarEventStore();
  
  const selectedCalendar = useCalendarStore((state)=>state.selectedCalendar)
  const setIsEdit = useCalendarUIStore((state)=>state.setIsEdit)
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
      advanced: null,
      repeat: null,
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

  const memoizedExpandedEvents = useMemo(() => {
    return expandRepeatedEvent(events, subMonths(currentDate, 1), addMonths(currentDate, 1));
  }, [events, currentDate])


  // useEffect(()=>{
  //   setEvents(memoizedExpandedEvents)
  // },[memoizedExpandedEvents])


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
      events={memoizedExpandedEvents}
      date={currentDate}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={handleSelectEvent}
      selectable
      onSelectSlot={handleSelectSlot}
      view={currentView}
      style={{ height: "100%", width: "100%" }}
      eventPropGetter={eventColorGetter}
      toolbar={false}
    />
  );
};
