import { calendarEvent } from "@/types/types";
import { isBefore } from "date-fns";
import { ensureDate } from "../typeGare";
import { addDoc } from "firebase/firestore";
import { eventsRef } from "../firestoreRefs";





export const addEvent = async(cid:string, activeCalendar:string, event:calendarEvent) =>{
    ensureDate(event.end)
    ensureDate(event.start)

    if(!event.title.trim()){
        alert("タイトルを入力してください");
        return;
    }
    if (!activeCalendar) {
        alert("テーマを選択してください");
        return;
      }
    if (isBefore(event.end, event.start) && !event.allDay) {
        alert("終了日は開始日より後にしてください");
        return;
    }  
    try{
        await addDoc(eventsRef(cid,activeCalendar),event)
        alert("カレンダーを登録しました")
    }catch(err:unknown){
        console.log("エラー",err)
    }
}