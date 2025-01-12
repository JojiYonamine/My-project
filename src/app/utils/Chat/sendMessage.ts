import { message } from "@/types/chatTypes";
import { messagesRef } from "../firestoreRefs";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const sendMessage = async (
  cid: string,
  uid: string,
  roomName: string,
  text: string
) => {
  const uploadLastMessage = async (
    cid: string,
    roomName: string,
    message: message
  ) => {
    try {
      const lastMessageRef = doc(
        db,
        "couples",
        cid,
        "chatrooms",
        roomName,
        "lastMessage"
      );
      await updateDoc(lastMessageRef, { message });
      console.log("updated the last message");
    } catch (err: unknown) {
      console.log(err);
      alert("uploadLastMessageでエラー");
    }
  };

  const messagesCollection = messagesRef(cid, roomName);
  const messageDocRef = doc(messagesCollection);
  const sentAt = new Date();
  const message: message = {
    id: messageDocRef.id,
    text: text,
    sentBy: uid,
    sentAt: sentAt,
    read: false,
  };
  try {
    await setDoc(messageDocRef, message);
    await uploadLastMessage(cid, roomName, message);
  } catch (err: unknown) {
    alert(err);
    console.log("sendMessage関数でエラー");
  }
};
