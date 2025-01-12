import { getDoc, setDoc } from "firebase/firestore";
import { chatRoomRef } from "../firestoreRefs";
import { chatRoom } from "@/types/chatTypes";

export const checkRoom = async (
  cid: string,
  roomName: string
): Promise<boolean> => {
  try {
    console.log("ルームチャック開始");
    const chatRoomSnapshot = await getDoc(chatRoomRef(cid, roomName));
    if (chatRoomSnapshot.exists()) {
      alert("同名のチャットルームが存在します！")
      return false
    } else {
      return true;
    }
  } catch (err: unknown) {
    console.log("checkRoom関数でエラー");
    alert(err);
    return false;
  }
};

export const CreateChatRoom = async (cid: string, roomName: string) => {
  console.log("start creating room");

  if (!cid) {
    console.log("you need to make couple to create chat room");
    return;
  }
  if (roomName.trim().length < 1) {
    console.log("you need to decide the name");
    return;
  }

  const isAvailable:boolean = await checkRoom(cid,roomName)
  console.log(isAvailable)
  if(isAvailable == true){
    try {
      console.log("ルーム作成に入ります")
      const createdAt = new Date();
      const newChatRoom:chatRoom = {
        name:roomName,
        createdAt:createdAt,
        lastMessage:{
          id:"theFistLastMesssage",
          text:"theFistLastMesssage",
          sentBy:"developer",
          sentAt:createdAt,
          read:false
        }
      }
      await setDoc(chatRoomRef(cid, roomName), newChatRoom);
      console.log("ルーム作成完了");
    } catch (err: unknown) {
      console.error("エラーが発生", err);
    }
  }else{
    return 
  }
  
};
