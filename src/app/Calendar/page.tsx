"use client"
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { auth } from "@/config/firebaseConfig";
import { useRouter } from "next/navigation";

const localizer = momentLocalizer(moment);
const events = [
  {
    title: "Birthday Party",
    start: new Date(2024, 11, 25, 10, 0),
    end: new Date(2024, 11, 25, 12, 0),
    allDay: false,
  },
  {
    title: "Meeting",
    start: new Date(2024, 11, 26, 14, 0),
    end: new Date(2024, 11, 26, 16, 0),
    allDay: false,
  },
];



export const  MyCalendar=()=>{
≈    if(!auth.currentUser){
        root.push("/");
        return;
    }
    const root = useRouter()

    const [title,setTitle] = useState<string>("")
    const [date,setDate] = useState<date>(null)
    const owner = auth.currentUser.uid
  return (
    <div style={{ height: 500 }}>
        <div>
            <input
            type=""
            placeholder=""
            value=""
            onChange={() => {}}>
            </input>
        </div>
        

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: "100%" }}
      />
    </div>
  );
}

export default MyCalendar;
