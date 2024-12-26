import { calendarEvent, calendarEventShowing } from "@/types/types";
import { isBefore } from "date-fns";
import { setDoc, updateDoc } from "firebase/firestore";
import { eventRef } from "../firestoreRefs";



export const uploadEditedEvent = async(cid:string, activeCalendar:string, editedEvent:calendarEventShowing) =>{
    if(!editedEvent.title.trim()){
        alert("タイトルを入力してください");
        return;
    }
    if (!activeCalendar) {
        alert("テーマを選択してください");
        return;
        }
    if (isBefore(editedEvent.end, editedEvent.start) && !editedEvent.allDay) {
        alert("終了日は開始日より後にしてください");
        return;
    }
    // editedEventから、eventIdを消し、calendarEventに代入
    const {eventId,...EditedEvent} = editedEvent
    try{
        await setDoc(eventRef(cid,activeCalendar,editedEvent.eventId), EditedEvent)
        alert("イベントを更新しました")
    }catch(err:unknown){
        console.error("エラー",err)
    }
}