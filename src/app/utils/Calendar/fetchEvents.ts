import { calendarEvent } from "@/types/types";
import { eventsRef } from "../firestoreRefs";
import { getDocs } from "firebase/firestore";


export const fetchEvents =async(cid:string,theme:string):Promise<calendarEvent[]> =>{
    const snapShot = await getDocs(eventsRef(cid,theme));
    return snapShot.docs.map((doc) => ({
        eventId:doc.id,
        title: doc.data().title,
        createdBy: doc.data().createdBy,
        createdAt: doc.data().createdAt.toDate(),
        allDay: doc.data().allDay,
        start: doc.data().start.toDate(), 
        end: doc.data().end.toDate()
    }));
}