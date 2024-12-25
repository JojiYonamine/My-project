import { calendar } from "@/types/types";
import { calendarRef, calendarsRef } from "../firestoreRefs";
import { addDoc } from "firebase/firestore";

export const addCalendar = async(cid:string, theme:string,calendar:calendar) =>{
    if(!calendar.theme){
        alert("themeを入力してください");
        return;
    }
    try{
        await addDoc(calendarsRef(cid),calendar)
        alert("カレンダーを登録しました")
    }catch(err:unknown){
        console.log("エラー",err)
    }
}