"use client"
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { auth } from "@/config/firebaseConfig";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

// const localizer = momentLocalizer(moment);


export const  MyCalendar=()=>{
    // const root = useRouter()

    const [title,setTitle] = useState<string>("")
    // const [date,setDate] = useState<Date>(new Date())
    const [date, setDate] = useState<string>(() => { //Inputようにフォーマット
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    });
    // const owner = auth.currentUser.uid
  return (
    <div style={{ height: 500 }}>
        <div>
            <input
            type="text"
            placeholder="タイトルを入力"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}
            />
            <input
            type="datetime-local"
            placeholder="日時を入力"
            value={date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setDate(e.target.value)}}
            />
            <button onClick={() => {console.log(`title:${title},date:${date}`,typeof(date))}}>登録</button>
        </div>
        

      {/* <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: "100%" }}
      /> */}
    </div>
  );
}

export default MyCalendar;
// const events = [
//   {
//     title: "Birthday Party",
//     start: new Date(2024, 11, 25, 10, 0),
//     end: new Date(2024, 11, 25, 12, 0),
//     allDay: false,
//   },
//   {
//     title: "Meeting",
//     start: new Date(2024, 11, 26, 14, 0),
//     end: new Date(2024, 11, 26, 16, 0),
//     allDay: false,
//   },
// ];

