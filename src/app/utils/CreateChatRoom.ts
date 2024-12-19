import { db } from "@/config/firebaseConfig"
import { addDoc, collection } from "firebase/firestore"

export const CreateChatRoom = async (coupleId:string,title:string,) => {
    const roomsRef = collection(db,"rooms");
    await addDoc(roomsRef,{
        coupleId,
        title:title,
        lastMessage:null,
        lastSentBy:null,
        lastSentDate:null,
        createdAt:new Date().toISOString
    });
    console.log("Chat room created!")
}