"use client"
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/navigation";
import { useCouple } from "@/Context/Couple-modified";
import { dateToIso, IsoToDate } from "@/utils/dateUtils";
import { addDoc } from "firebase/firestore";
import { eventsRef } from "@/utils/firestoreRefs";
import {RequireAuth} from "@/components/RequireAuth";
console.log(RequireAuth)
const localizer = momentLocalizer(moment);
function ensureCid(cid: string | null): asserts cid is string {
  if (!cid) {
    throw new Error("CID is required but was null");
  }
}

const  MyCalendar=()=>{
    const loading = useCouple().loading
    const root = useRouter()
    const owner = useCouple().user?.uid
    useEffect(() => {
      if (!loading && !owner) {
        console.log("you need to login");
        root.push("/");
        return;
      }
    }, [loading, owner, root]);
    // if (loading){
    //   return (<h1>now loading</h1>)
    // }
    // if(!owner){
    //   console.log('you need to')
    //   root.push("/")
    //   return null
    // }
    const cid = useCouple().cid
    const [title,setTitle] = useState<string>("")
    const [startDate,setStartDate] = useState<Date>(new Date())
    const [endDate,setEndDate] = useState<Date>(new Date())
    const [allDay,setAllDay] = useState<boolean>(false);
    const [calendarId,setCalendarId] = useState<string>("")
    ensureCid(cid)
    const addNewEvent = async() => {
      try{
        await addDoc(eventsRef(cid,calendarId),{
          createdBy:owner,
          allDay:allDay,
          title:title,
          start:startDate,
          end:endDate
        })
      
      }catch(err:unknown){
        console.error("エラーが発生",err)
      }
    }
  return (
    <div style={{ height: 500 }}>
        <div>
            <input
            type="text"
            placeholder="タイトルを入力"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}
            />
            <button onClick={(allDay) => {setAllDay(!allDay)}}></button>
            {allDay?
            (<div><input
              type="datetime-local"
              placeholder="開始日時を入力"
              value={dateToIso(startDate)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setStartDate(IsoToDate(e.target.value))}}
              />
              <input
              type="datetime-local"
              placeholder="終了日時を入力"
              value={dateToIso(endDate)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEndDate(IsoToDate(e.target.value))}}
              /></div>):
              (<div><input
                type="date"
                placeholder="日付"
                value={dateToIso(startDate)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setStartDate(IsoToDate(e.target.value))}}
                /></div>)}
            
            <button onClick={() => {console.log(`title:${title},date:${startDate}`,typeof(startDate));addNewEvent()}}>登録</button>
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

// export default MyCalendar;
const Calendar = () => {
  return (
    <RequireAuth>
      <MyCalendar />
    </RequireAuth>
  );
}
export default Calendar
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

