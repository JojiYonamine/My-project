// イベントを追加する関数
import { doc, setDoc } from "firebase/firestore";
import { eventRef, eventsRef } from "../firestoreRefs";
import useAuthStore from "@/Context/authStore";
import useCalendarStore from "@/Context/calendarStore";
import { useValidateEvent } from "./validateEvent";
import { calendarEvent } from "@/types/calendarTypes";

export const useEvent = (action: "create" | "edit") => {
  const currentCid = useAuthStore((state) => state.currentCid)!;
  const calendarId = useCalendarStore(
    (state) => state.selectedCalendar
  )?.calendarId;
  const event: calendarEvent = useCalendarStore(
    (state) => state.selectedEvent
  ) as calendarEvent;
  const validate = useValidateEvent();
  const setSelectedEvent = useCalendarStore((state)=>state.setSelectedEvent)

  const eventHandler = async () => {
    // バリデーション
    const errors = validate(event);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // firestoreの参照を作成
    const ref =
      action == "create"
        ? doc(eventsRef(currentCid, calendarId!))
        : eventRef(currentCid, calendarId!, event.eventId!);
    const newEvent = {
      ...event,
      eventId: action == "create" ? ref.id : event.eventId,
    };

    try {
      await setDoc(ref, newEvent);
      alert("イベントを更新しました");
      setSelectedEvent(null)
    } catch (err: unknown) {
      console.log(err, "addEventでエラー");
    }
  };

  return eventHandler
};
