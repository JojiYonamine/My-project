import { db } from "@/config/firebaseConfig"
import { collection, doc, getDoc } from "firebase/firestore"


// users コレクションへの参照
export const usersRef = () => collection(db,"users")

export const userRef = (uid:string) => (doc(db,"users",uid))

export const coupleRef = (cid:string) => (doc(db,"couples",cid))

export const calendarsRef = (cid:string) =>(collection(db,"couples",cid,"calendars"))

export const calendarRef = (cid:string,calendarId:string) =>(doc(db,"couples",cid,"calendars",calendarId))

export const eventsRef = (cid:string,calendarId:string) => (collection(db,"couples",cid,"calendars",calendarId,"events"))

export const eventRef = (cid:string,calendarId:string,eventId:string) => (doc(db,"couples",cid,"calendars",calendarId,"events",eventId))

export const tasksRef = (cid:string) =>(collection(db,"couples",cid,"tasks"))

export const taskRef = (cid:string,taskId:string) =>doc(db,"couples",cid,"tasks",taskId)

export const chatRoomsRef = (cid:string) => (collection(db,"couples",cid,"chatrooms"))

export const chatRoomRef = (cid:string,roomName:string) => doc(db,"couples",cid,"chatrooms",roomName)

export const messagesRef = (cid:string, roomName:string) => collection(db,"couples",cid,"chatrooms",roomName,"messages")

export const getUserNameFromFirestore = async(uid:string) =>  {
    try{
        const doc = await getDoc(userRef(uid))
        if(!doc.exists()) return "ユーザーなし"
        const userName = doc.data().name
        if(!userName) return "ユーザー名なし"
        return userName
    }catch(err:unknown){
        alert(err)
    }
}