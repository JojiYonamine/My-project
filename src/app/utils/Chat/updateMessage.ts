// 既読つける用の関数
import { message } from "@/types/chatTypes";
import { updateDoc } from "firebase/firestore";
import { messageRef } from "../firestoreRefs";

export const updateMessage = async (
  message: message,
  cid: string,
  roomName: string
) => {
  try {
    updateDoc(messageRef(cid, roomName, message.id), { read: true });
  } catch (err: unknown) {
    console.error("updateMessageでエラー", err);
  }
};
