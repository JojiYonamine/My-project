// イベントの削除を担当するカスタムフック


import { deleteDoc, setDoc } from "firebase/firestore";
import { eventRef } from "../others/firestoreRefs";
import useCalendarStore from "@/Context/Calendar/calendarStore";
import useAuthStore from "@/Context/authStore";
import useCalendarEventStore from "@/Context/Calendar/calendarEventStore";
import { calendarEvent } from "@/types/calendarTypes";

export const useDeleteEvent = () => {
  const cid = useAuthStore((state) => state.currentCid);
  const selectedCalendar = useCalendarStore((state) => state.selectedCalendar);
  const selectedEvent = useCalendarEventStore((state) => state.selectedEvent);
  const originalEvents = useCalendarEventStore((state) => state.events);


  const calendarId = selectedCalendar?.calendarId;
  const eventId = selectedEvent?.eventId;

  const originalEvent = originalEvents.find((event)=>event.eventId === selectedEvent?.eventId)

  const deleteEvent = async (action: "delete" | "setEndDate" | "setNoDate") => {
    const getNewEvent = (): calendarEvent | void => {
      if (action === "delete" || !originalEvent || !originalEvent.repeat||!selectedEvent) return;
      switch (action) {
        case "setEndDate": {
          return { ...originalEvent, repeat: { ...originalEvent.repeat, endDate: selectedEvent.start } };
        }
        case "setNoDate": {
          return {
            ...originalEvent,
            repeat: {
              ...originalEvent.repeat,
              noDate: originalEvent.repeat.noDate
                ? [...originalEvent.repeat.noDate, selectedEvent.start]
                : [selectedEvent.start],
            },
          };
        }
      }
    };

    const newEvent = getNewEvent()


    try {
      if (action === "delete") {
        await deleteDoc(eventRef(cid!, calendarId!, eventId!));
        alert("削除しました");
      } else {
        await setDoc(eventRef(cid!, calendarId!, eventId!), newEvent!);
      }
    } catch (err: unknown) {
      console.error("エラーが発生", err);
    }
  };
  return deleteEvent;
};
