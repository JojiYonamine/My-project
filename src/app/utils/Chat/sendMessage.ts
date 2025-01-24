// メッセージ送信用の関数

import { message } from "@/types/chatTypes";
import { messagesRef } from "../others/firestoreRefs";
import {
  doc,
  DocumentData,
  DocumentReference,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

// メッセージの送信・チャットルームのラストメッセージを更新
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

// 呼び出すとき用;
const SendMessage = (
  cid: string,
  uid: string,
  roomName: string,
  text: string
) => {
  // firestoreのIDをmessageに持たせる
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
