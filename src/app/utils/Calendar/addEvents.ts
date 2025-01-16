// イベントを追加する関数

import { isBefore } from "date-fns";
import { doc, setDoc } from "firebase/firestore";
import { eventsRef } from "../firestoreRefs";
import { calendarEvent } from "@/types/calendarTypes";
import useAuthStore from "@/Context/authStore";
import useCalendarStore from "@/Context/calendarStore";

const addEvent = async (
  uid: string,
  cid: string,
  calendarId: string,
  title: string,
  allDay: boolean,
  start: Date,
  end: Date,
  color: string
) => {
  const eventDocRef = doc(eventsRef(cid, calendarId));
  const createdAt = new Date();
  const event: calendarEvent = {
    eventId: eventDocRef.id,
    title: title,
    createdBy: uid,
    createdAt: createdAt,
    allDay: allDay,
    start: start,
    end: end,
    color: color,
  };
  try {
    await setDoc(eventDocRef, event);
    alert("カレンダーを登録しました");
  } catch (err: unknown) {
    console.log("エラー", err);
  }
};

export const AddEvent = (
  title: string,
  allDay: boolean,
  start: Date,
  end: Date,
  color: string
) => {
  const currentCid = useAuthStore((state) => state.currentCid)!;
  const uid = useAuthStore((state) => state.currentUser)!.uid;
  const calendarId = useCalendarStore(
    (state) => state.selectedCalendar
  )?.calendarId;
  if (!calendarId) {
    alert("カレンダーを選択してください");
    return;
  }
  if (title.trim()) {
    alert("タイトルを入力してください");
    return;
  }
  if (isBefore(end, start) && !allDay) {
    alert("終了日は開始日より後にしてください");
    return;
  }
  addEvent(uid, currentCid, calendarId, title, allDay, start, end, color);
};
