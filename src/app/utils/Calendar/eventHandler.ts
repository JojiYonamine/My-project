// イベントを追加する関数
import { doc, setDoc } from "firebase/firestore";
import { eventRef, eventsRef } from "../others/firestoreRefs";
import useAuthStore from "@/Context/authStore";
import useCalendarStore from "@/Context/Calendar/calendarStore";
import { useValidateEvent } from "./validateEvent";
import { calendarEvent } from "@/types/calendarTypes";
import useCalendarEventStore from "@/Context/Calendar/calendarEventStore";

export const useEvent = (action: "create" | "edit") => {
  const currentCid = useAuthStore((state) => state.currentCid)!;
  const calendarId = useCalendarStore((state) => state.selectedCalendar)?.calendarId;
  const event: calendarEvent = useCalendarEventStore((state) => state.selectedEvent) as calendarEvent;
  const validate = useValidateEvent();
  const setSelectedEvent = useCalendarEventStore((state) => state.setSelectedEvent);

  const eventHandler = async () => {
    // バリデーション
    const errors = validate(event);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // firestoreの参照を作成
    const ref =
      action == "create" ? doc(eventsRef(currentCid, calendarId!)) : eventRef(currentCid, calendarId!, event.eventId!);
    const newEvent = {
      ...event,
      eventId: action == "create" ? ref.id : event.eventId,
    };

    try {
      await setDoc(ref, newEvent);
      alert("イベントを更新しました");
      setSelectedEvent(null);
    } catch (err: unknown) {
      console.log(err, "eventHndlerでエラー");
    }
  };

  return eventHandler;
};
