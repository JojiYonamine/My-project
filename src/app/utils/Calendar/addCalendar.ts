// カレンダーを追加する関数
import { calendarsRef } from "../firestoreRefs";
import { doc, setDoc } from "firebase/firestore";
import { checkThemeExists } from "./checkThemeExists";
import { calendar } from "@/types/calendarTypes";
import useAuthStore from "@/Context/authStore";


const addCalendar = async(uid:string,currentCid:string,theme:string,share:boolean,description:string|undefined) => {
    const calendarDocRef = doc(calendarsRef(currentCid))
    const createdAt = new Date()
    const exists = await checkThemeExists(currentCid,theme)
    if(exists){
        alert("同テーマのカレンダーが存在します")
        return
    }
    if(!theme){
        alert("テーマを入力してください")
        return
    }
    const calendar:calendar = {
        calendarId:calendarDocRef.id,
        theme:theme,
        description:description,
        share:share,
        createdAt:createdAt,
        createdBy:uid
    }
    try{
        await setDoc(calendarDocRef,calendar)
        alert("カレンダーを登録しました")
    }catch(err:unknown){
        console.log("エラー",err)
    }
}

// async関数では、useAuthStore使えないので分けた。これを呼び出す
export const AddCalendar = (theme:string,share:boolean,description:string|undefined) =>{
    const {currentCid,currentUser} = useAuthStore()
    const uid = currentUser!.uid
    addCalendar(uid,currentCid!,theme,share,description)
}