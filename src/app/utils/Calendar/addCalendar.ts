import { calendar } from "@/types/types";
import { calendarRef } from "../firestoreRefs";
import { setDoc } from "firebase/firestore";
import { checkThemeExists } from "./checkThemeExists";

export const addCalendar = async(cid:string, theme:string,calendar:calendar) =>{
    if(!theme){
        alert("themeを入力してください");
        return;
    }
    const exists = await checkThemeExists(cid,theme)
    if(exists){
        alert("同じテーマのカレンダーが存在します。")
        return;
    }

    try{
        await setDoc(calendarRef(cid,theme),calendar)
        alert("カレンダーを登録しました")
    }catch(err:unknown){
        console.log("エラー",err)
    }
}