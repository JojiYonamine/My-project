"use client";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/navigation";
import { useCouple } from "@/Context/Couple-modified";
import { dateAndTimeToIso, dateToIso, IsoToDate, timestampToDate } from "@/utils/dateUtils";
import {
  addDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { calendarRef, calendarsRef, eventsRef } from "@/utils/firestoreRefs";
import { RequireAuth } from "@/components/RequireAuth";
import { format, getDay, isAfter, isBefore, parse, startOfWeek } from "date-fns";
import { calendar, calendarEvent } from "@/types/types";
import { ja } from "date-fns/locale";

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

function ensureCid(cid: string | null): asserts cid is string {
  if (!cid) {
    throw new Error("CID is required but was null");
  }
}
function ensureUser(user: { uid: string; email: string | null; name: string | null } | null): asserts user is  { uid: string; email: string | null; name: string | null }  {
  if (!user) {
    throw new Error("User is required but was null");
  }
}
function ensureUid(uid: string | null): asserts uid is string {
  if (!uid) {
    throw new Error("UID is required but was null");
  }
}


const MyCalendar = () => {
  const loading = useCouple().loading;
  const root = useRouter();
  const cid = useCouple().cid;
  const user = useCouple().user
  ensureUser(user)
  const owner = user.uid;
  ensureCid(cid);

  useEffect(() => {
    if (!loading && !owner) {
      console.log("you need to login");
      root.push("/");
      return;
    }
  }, [loading, owner, root]);

  //イベント用の状態
  const [eventTitle, setEventTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [allDay, setAllDay] = useState<boolean>(false);
  // const [events, setEvents] = useState([]);
  const [events, setEvents] = useState<calendarEvent[]>([]);

  //カレンダー用の状態
  const [description, setDescription] = useState<string>("");
  const [share, setShare] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("");
  const [calendars, setCalendars] = useState<calendar[]>([]);
  const [activeCalendar, setActiveCalendar] = useState<string>("not selected");

  // const [calendarId,setCalendarId] = useState<string>("")
  const addNewEvent = async () => {
    if (!eventTitle.trim()) {
      alert("タイトルを入力してください");
      return;
    }
    if (!activeCalendar) {
      alert("テーマを入力してください");
      return;
    }
    if (!(isBefore(startDate, endDate))&&(!allDay)) {
      console.log(!isBefore(startDate, endDate),allDay)
      alert("終了日は開始日より後にしてください");
      return
    }
    if (!startDate || !endDate) {
      alert("日付を入力してください");
      return;
    }
    const newEvent:calendarEvent={
      title: eventTitle,
      createdBy: owner,
      createdAt: serverTimestamp(),
      allDay: allDay,
      start: startDate,
      end: endDate
    }
    console.log(!isBefore(startDate, endDate),allDay)
    try {
      await addDoc(eventsRef(cid, activeCalendar), newEvent);
    } catch (err: unknown) {
      console.error("エラーが発生", err);
    }
  };

  const addNewCalendr = async () => {
    const newCalendar: calendar = {
      theme: theme,
      description: description,
      share: share,
      createdAt: serverTimestamp(),
    };
    setTheme("")
    setDescription("")
    setShare(false)

    try {
      await setDoc(calendarRef(cid, theme), newCalendar);
    } catch (err: unknown) {
      console.error("エラー", err);
    }
  };

  // カレンダー取得
  useEffect(() => {
    console.log("リスナー開始、カレンダーs");
    const unsubcribe = onSnapshot(calendarsRef(cid), (snapshot) => {
      const Calendars: calendar[] = snapshot.docs.map((doc) => ({
        theme: doc.id,
        description: doc.data().description,
        share: doc.data().share,
        createdAt: doc.data().createdAt,
      }));
      setCalendars(Calendars);
    });
    return () => {
      unsubcribe();
      console.log("リスナー解除、カレンダーs");
    };
  }, [cid]);


  // イベント取得
  useEffect(() => {
    const unsubcribe = onSnapshot(eventsRef(cid,activeCalendar),(snapshot) => {
      const Events:calendarEvent[] = snapshot.docs.map((doc)=>({
      // const Events = snapshot.docs.map((doc)=>({
        title:doc.data().title,
        createdBy:doc.data().createdBy,
        createdAt: doc.data().createdA.toDate(),
        allDay: doc.data().allDay,
        start: doc.data().start.toDate(),//timestampToDate(doc.data().start),//timestampToDate(doc.data().startDate) ,
        end: doc.data().end.toDate()//timestampToDate(doc.data().end),//timestampToDate(doc.data().endDate),
      })
    )
      setEvents(Events);console.log(Events)
    })
    return () => {
      unsubcribe();
      console.log("リスナー解除、イベントs");
    };
  },[cid,activeCalendar])

  const handleChangeShare = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShare(e.target.checked);
  };
  const handleChangeAllDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllDay(e.target.checked);
  };

  return (
    <div style={{ height: 500 }}>
      <div>
        {/* カレンダー表示 */}
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
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            addNewCalendr();
          }}
        >
          <input
            type="text"
            placeholder="テーマを入力"
            value={theme}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTheme(e.target.value);
            }}
          />
          <label>
          <input
              type="checkbox"
              checked={share}
              onChange={handleChangeShare}
            />
            共有
          </label>

          <input
            type="text"
            placeholder="説明を入力"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
          />
          <button type="submit">カレンダーを登録</button>
        </form>

        {/* イベント登録 */}
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            addNewEvent();
          }}
        >
          <input
            type="text"
            placeholder="タイトルを入力"
            value={eventTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEventTitle(e.target.value);
            }}
          />
          <label>
            <input
              type="checkbox"
              checked={allDay}
              onChange={handleChangeAllDay}
            />
            終日
          </label>

          {allDay ?(
            <div>
              <input
                type="date"
                value={dateToIso(startDate)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setStartDate(IsoToDate(e.target.value));
                  setEndDate(IsoToDate(e.target.value));
                }}
              />
            </div>
          ) :(
            <div>
              <input
                type="datetime-local"
                placeholder="開始日時を入力"
                value={dateAndTimeToIso(startDate)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setStartDate(IsoToDate(e.target.value));
                }}
              />
              <input
                type="datetime-local"
                placeholder="終了日時を入力"
                value={dateAndTimeToIso(endDate)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEndDate(IsoToDate(e.target.value));
                }}
              />
            </div>
          ) }
          <button type="submit">イベントを登録</button>
        </form>
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: "100%" }}
      />
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
};

// export default MyCalendar;
const CalendarFeat = () => {
  return (
    <RequireAuth>
      <MyCalendar />
    </RequireAuth>
  );
};
export default CalendarFeat;
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
