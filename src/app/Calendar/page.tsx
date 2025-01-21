"use client";
import React from "react";
import { RequireAuth } from "@/components/RequireAuth";
import Sidebar from "@/components/Sidebar";
import { CalendarList } from "@/components/Calendar/calendarList";
import { MainCalendar } from "@/components/Calendar/mainCalendar";
import { EventSidebar } from "@/components/Calendar/eventSidebar";

const MyCalendar = () => {
  return (
    <RequireAuth>
      <div className="flex">
        <Sidebar />
        {/* カレンダーリスト表示 */}
        <CalendarList />
        {/* イベント登録 */}
        {/* <CreateNewEvent /> */}
        <div className="w-full h-full">
          {/* カレンダー表示 */}
          <MainCalendar />
        </div>

        {/* イベント選択時 */}
        <EventSidebar/>
      </div>
    </RequireAuth>
  );
};

export default MyCalendar;
