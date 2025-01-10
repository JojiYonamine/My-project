import { db } from "@/config/firebaseConfig";
import { addDoc, collection, getDoc, serverTimestamp, setDoc, where } from "firebase/firestore";
import { chatRoomRef, chatRoomsRef } from "../firestoreRefs";

export const checkRoom = async (cid:string,roomName:string):Promise<boolean> =>{
    try{
        const chatRoomSnapshot = await getDoc(chatRoomRef(cid,roomName))
        if(!chatRoomSnapshot.exists()){
            return false
        }else{
            return true
        }
    }catch(err:unknown){
        alert(err)
        console.log("checkRoom関数でエラー")
        return false
    }

}

export const CreateChatRoom = async (cid:string,roomName:string) => {
    if (!cid) {
      console.log("you need to make couple to create chat room");
      return;
    }
    
    const isInUse:boolean = await checkRoom(cid,roomName)
    if(isInUse){
        try {
            await setDoc(chatRoomRef(cid,roomName), {
              createdAt: serverTimestamp(),
            });
          } catch (err: unknown) {
            console.error("エラーが発生", err);
          }
    }else{
        alert("ルーム作成中にエラーが発生")
    }
  };