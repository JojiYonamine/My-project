import { deleteDoc } from "firebase/firestore";
import { eventRef } from "../firestoreRefs";
import { calendar, calendarEvent } from "@/types/calendarTypes";
import useCalendarStore from "@/Context/calendarStore";
import useAuthStore from "@/Context/authStore";

const deleteEvent = async (cid:string,selectedCalendar:calendar, selectedEvent:calendarEvent) => {
    const calendarId =selectedCalendar.calendarId
    const eventId = selectedEvent.eventId
  try {
    await deleteDoc(eventRef(cid, calendarId, eventId));
    alert("削除しました");
  } catch (err: unknown) {
    console.error("エラーが発生", err);
  }
};

export const DeleteEvent = () => {
    const cid = useAuthStore((state)=>state.currentCid)
    const selectedCalendar = useCalendarStore((state)=>state.selectedCalendar)
    const selectedEvent = useCalendarStore((state)=>state.selectedEvent)
    if(!cid||!selectedCalendar||!selectedEvent){
        return
    }
    deleteEvent(cid,selectedCalendar,selectedEvent)
};
