"use client";
import React from "react";
import { RequireAuth } from "@/components/RequireAuth";
import Sidebar from "@/components/Sidebar";
import { CalendarList } from "@/components/Calendar/calendarList";
import { MainCalendar } from "@/components/Calendar/mainCalendar";
import { EventSidebar } from "@/components/Calendar/eventSidebar/eventSidebar";
import { CalendarHeader } from "@/components/Calendar/calendarHeader";

const MyCalendar = () => {
  return (
    <RequireAuth>
      <div className="flex">
        <Sidebar />
        {/* カレンダーリスト*/}
        <CalendarList />
        <div className="flex flex-col w-full">
          {/* ヘッダー・ツールバー */}
          <CalendarHeader />
          <div className="flex h-full w-full ">
            {/* カレンダー */}
            <MainCalendar />
            {/* イベント作成・編集 */}
            <EventSidebar />
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

export default MyCalendar;
