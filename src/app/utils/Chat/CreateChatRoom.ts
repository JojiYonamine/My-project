import { setDoc } from "firebase/firestore";
import { chatRoomRef } from "../firestoreRefs";
import { chatRoom } from "@/types/types";

export const checkRoom = async (
  cid: string,
  roomName: string
): Promise<boolean> => {
  try {
    console.log("ルームチャック開始");
    const chatRoomSnapshot = await getDoc(chatRoomRef(cid, roomName));
    if (!chatRoomSnapshot.exists()) {
      return false;
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

  try {
    const createdAt = new Date();
    const newChatRoom:chatRoom = {
      name:roomName,
      createdAt:createdAt,
      lastMessage:{
        text:"",
        sentAt:createdAt
      }
    }
    await setDoc(chatRoomRef(cid, roomName), newChatRoom);
    console.log("ルーム作成完了");
  } catch (err: unknown) {
    console.error("エラーが発生", err);
  }
};
