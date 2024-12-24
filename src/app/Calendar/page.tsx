"use client"
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/navigation";
import { useCouple } from "@/Context/Couple-modified";
import { dateToIso, IsoToDate } from "@/utils/dateUtils";
import { addDoc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { calendarRef, calendarsRef, eventsRef } from "@/utils/firestoreRefs";
import {RequireAuth} from "@/components/RequireAuth";
import { isBefore } from "date-fns";
import { calendar } from "@/types/types";
import { af } from "date-fns/locale";
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
    //イベント用の状態
    const [eventTitle,setEventTitle] = useState<string>("")
    const [startDate,setStartDate] = useState<Date>(new Date())
    const [endDate,setEndDate] = useState<Date>(new Date())
    const [allDay,setAllDay] = useState<boolean>(false);

    
    //カレンダー用の状態
    const [description,setDescription] = useState<string>("");
    const [share,setShare] = useState<boolean>(false);
    const [theme,setTheme] = useState<string>("")
    const [calendars,setCalendars] = useState<calendar[]>([])
    const [activeCalendar,setActiveCalendar] = useState<string>("")

    // const [calendarId,setCalendarId] = useState<string>("")
    ensureCid(cid)
    const addNewEvent = async() => {
      if (!eventTitle.trim()) {
        alert("タイトルを入力してください");
        return;
      }
      if (!theme.trim()) {
        alert("テーマを入力してください");
        return;
      }
      if (isBefore(startDate,endDate)){
        alert("終了日は開始日より後にしてください")
      }
      if(!startDate||!endDate){
        alert("日付を入力してください")
      }
      try{
        await addDoc(eventsRef(cid,theme),{
          title:eventTitle,
          createdBy:owner,
          createdAt:serverTimestamp(),
          share:share,
          allDay:allDay,
          start:startDate,
          end:endDate
        })
      }catch(err:unknown){
        console.error("エラーが発生",err)
      }
    }

    const addNewCalendr = async () => {
      const newCalendar:calendar ={
        theme:theme,
        description:description,
        share:share,
        createdAt:serverTimestamp()
      }
      try{
        await setDoc(calendarRef(cid,theme),newCalendar)
      }catch(err:unknown){
        console.error("エラー",err)
      }
    }

    useEffect(() => {
        console.log("リスナー開始、カレンダーs");
        const unsubcribe = onSnapshot(calendarsRef(cid), (snapshot) => {
          const Calendars:calendar[] = snapshot.docs.map((doc) => ({
              theme:doc.id,
              description:doc.data().description,
              share:doc.data().share,
              createdAt:doc.data().createdAt
          }));
          setCalendars(Calendars)
        });
    
        return () => {
          unsubcribe();
          console.log("リスナー解除、カレンダーs");
        };
      }, [cid]);
    


  return (
    <div style={{ height: 500 }}>
        <div>

            <div>
              <h1>Calendars</h1>
              <ul>
                {calendars.map((calendar) => (
                  <li key={calendar.theme}>
                    <button
                      onClick={() => {
                        setActiveCalendar(calendar.theme);
                        console.log(calendar.theme);
                      }}
                    >
                      {calendar.theme}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          {/* カレンダー作成 */}
          <form onSubmit={(e:React.FormEvent<HTMLFormElement>) => {e.preventDefault();addNewCalendr()}}>
            <input
            type="text"
            placeholder="テーマを入力"
            value={theme}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTheme(e.target.value)}}
            />
            <button onClick={(share) => {setShare(!share)}}></button>
            <input
            type="text"
            placeholder="説明を入力"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setDescription(e.target.value)}}
            />
            <button type="submit">カレンダーを登録</button>
          </form>
           
            <input
            type="text"
            placeholder="タイトルを入力"
            value={eventTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEventTitle(e.target.value)}}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setStartDate(IsoToDate(e.target.value));setEndDate(IsoToDate(e.target.value))}}
                /></div>)}
            
            <button onClick={() => {console.log(`title:${eventTitle},date:${startDate}`,typeof(startDate));addNewEvent()}}>登録</button>
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

