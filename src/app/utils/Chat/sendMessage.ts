import { message } from "@/types/types";
import { messagesRef } from "../firestoreRefs";
import { addDoc } from "firebase/firestore";

export const sendMessage = async(cid:string,roomName:string,message:message) =>{
    try{
        await addDoc(messagesRef(cid,roomName),{
            message
        })
    }catch(err:unknown){
        alert(err)
        console.log("sendMessage関数でエラー")
    }
}