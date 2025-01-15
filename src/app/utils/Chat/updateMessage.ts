import { message } from "@/types/chatTypes"
import { updateDoc } from "firebase/firestore"
import { messageRef } from "../firestoreRefs"

// 既読つける用
export const updateMessage = async(message:message,uid:string,cid:string,roomName:string) =>{
    if(message.sentBy==uid)
        return
    else{
        // const readMessage:message = {...message,read:true}

        try{
            // const readMessage:message = {...message,read:true}
            updateDoc(messageRef(cid,roomName,message.id),{read:true})
        }catch(err:unknown){
            console.error("updateMessageでエラー",err)
        }

    }
}