import { db } from "@/config/firebaseConfig"
import { collection, doc } from "firebase/firestore"


// users コレクションへの参照
export const usersRef = () => {collection(db,"users")}

export const userRef = (uid:string) => (doc(db,"users",uid))

export const coupleRef = (cid:string) => {doc(db,"couples",cid)}

export const calendarsRef = (cid:string) =>(collection(db,"couples",cid,"calendars"))

export const calendarRef = (cid:string,calendarId:string) =>(doc(db,"couples",cid,"calendars",calendarId))

export const eventsRef = (cid:string,calendarId:string) => (collection(db,"couples",cid,"calendars",calendarId,"events"))

export const eventRef = (cid:string,calendarId:string,eventId:string) => (doc(db,"couples",cid,"calendars",calendarId,"events",eventId))

export const tasksRef = (cid:string) =>(collection(db,"couples",cid,"tasks"))

export const taskRef = (cid:string,taskId:string) =>doc(db,"couples",cid,"tasks",taskId)