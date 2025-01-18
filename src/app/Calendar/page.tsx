"use client";
import React from "react";
import { RequireAuth } from "@/components/RequireAuth";
import Sidebar from "@/components/Sidebar";
import { CalendarList } from "@/components/Calendar/calendarList";
import { CreateCalendar } from "@/components/Calendar/createCalendarButton";
import { CreateNewEvent } from "@/components/Calendar/createNewEvent";
import { EditEvent } from "@/components/Calendar/editEvent";
import { MainCalendar } from "@/components/Calendar/mainCalendar";
import { CalendarHeader } from "@/components/Calendar/calendarHeader";

const MyCalendar = () => {
  return (
    <RequireAuth>
      <div className="flex">
        <Sidebar />
        {/* カレンダーリスト表示 */}
        <CalendarList />
        {/* イベント登録 */}
        {/* <CreateNewEvent /> */}
        <div className="w-full">
          {/* ヘッダー */}
          {/* <CalendarHeader /> */}
          {/* カレンダー表示 */}
          <MainCalendar />
        </div>

        {/* イベント選択時 */}
        {/* <EditEvent /> */}
      </div>
    </RequireAuth>
  );
};

export default MyCalendar;
