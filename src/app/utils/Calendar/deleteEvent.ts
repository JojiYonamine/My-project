import { deleteDoc } from "firebase/firestore"
import { eventRef } from "../firestoreRefs"

export const deleteEvent = async (cid:string,theme:string,eventId:string,) => {
    try{
        await deleteDoc(eventRef(cid,theme,eventId))
        alert("削除しました")
    }catch(err:unknown){
        console.error("エラーが発生",err)
    }
}