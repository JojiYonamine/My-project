// イベントを更新する関数

import { isBefore } from "date-fns";
import { setDoc} from "firebase/firestore";
import { eventRef } from "../firestoreRefs";
import { calendarEvent } from "@/types/calendarTypes";
import useAuthStore from "@/Context/authStore";
import useCalendarStore from "@/Context/calendarStore";

const uploadEvent = async(cid:string,calendarId:string,editedEvent:calendarEvent) =>{
    try{
        await setDoc(eventRef(cid,calendarId,editedEvent.eventId), editedEvent)
        alert("イベントを更新しました")
    }catch(err:unknown){
        console.error("エラー",err)
    }
}
export const UploadEditedEvent = (editedEvent:calendarEvent|null) =>{
    const cid = useAuthStore((state)=>state.currentCid)!
    const calendarId = useCalendarStore((state)=>state.selectedCalendar)?.calendarId
    if(!editedEvent){
        alert("イベントを選択してください")
        return
    }
    if(!editedEvent.title.trim()){
        alert("タイトルを入力してください");
        return;
    }
    if (!calendarId) {
        alert("テーマを選択してください");
        return;
        }
    if (isBefore(editedEvent.end, editedEvent.start) && !editedEvent.allDay) {
        alert("終了日は開始日より後にしてください");
        return;
    }
    uploadEvent(cid,calendarId,editedEvent)
}