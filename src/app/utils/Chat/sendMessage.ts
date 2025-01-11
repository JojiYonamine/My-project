import { message } from "@/types/types";
import { messagesRef } from "../firestoreRefs";
import { doc, setDoc } from "firebase/firestore";

export const sendMessage = async (
  cid: string,
  uid: string,
  roomName: string,
  text: string
) => {
  const messagesCollection = messagesRef(cid, roomName);
  const messageDocRef = doc(messagesCollection);
  const sentAt = new Date()
  const message: message = {
    id: messageDocRef.id,
    text: text,
    sentBy: uid,
    sentAt: sentAt,
    read: false,
  };
  try {
    await setDoc(messageDocRef, message);
  } catch (err: unknown) {
    alert(err);
    console.log("sendMessage関数でエラー");
  }
};
