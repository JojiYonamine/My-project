"use client";
import React from "react";
import { RequireAuth } from "@/components/RequireAuth";
import Sidebar from "@/components/Sidebar";
import { CalendarList } from "@/components/Calendar/calendarList";
import { CreateCalendarButton } from "@/components/Calendar/createCalendarButton";
import { CreateNewEvent } from "@/components/Calendar/createNewEvent";
import { EditEvent } from "@/components/Calendar/editEvent";
import { MainCalendar } from "@/components/Calendar/mainCalendar";

const MyCalendar = () => {
  return (
    <RequireAuth>
      <Sidebar />
      {/* カレンダーリスト表示 */}
      <CalendarList />
      {/* カレンダー作成 */}
      <CreateCalendarButton />
      {/* イベント登録 */}
      <CreateNewEvent />
      {/* カレンダー表示 */}
      <MainCalendar />
      {/* イベント選択時 */}
      <EditEvent />
    </RequireAuth>
  );
};

export default MyCalendar;
