import { message } from "@/types/chatTypes";
import { messagesRef } from "../firestoreRefs";
import {
  doc,
  DocumentData,
  DocumentReference,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const sendMessageAndLastMessage = async (
  message: message,
  messageDocRef: DocumentReference<DocumentData>,
  lastMessageRef: DocumentReference<DocumentData>
) => {
  try {
    await setDoc(messageDocRef, message);
  } catch (err: unknown) {
    alert(err);
    console.log("sendMessage関数でエラー");
  }
  try {
    await updateDoc(lastMessageRef, { lastMessage: message });
  } catch (err: unknown) {
    console.log(err);
    console.log("uploadLastMessageでエラー");
  }
};

// 呼び出し用;
const SendMessage = (
  cid: string,
  uid: string,
  roomName: string,
  text: string
) => {
  const messagesCollection = messagesRef(cid, roomName);
  const messageDocRef = doc(messagesCollection);
  const lastMessageRef = doc(db, "couples", cid, "chatrooms", roomName);
  const sentAt = new Date();
  const message: message = {
    id: messageDocRef.id,
    text: text,
    sentBy: uid,
    sentAt: sentAt,
    read: false,
  };
  sendMessageAndLastMessage(message, messageDocRef, lastMessageRef);
};

export default SendMessage;
