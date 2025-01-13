import { message } from "@/types/chatTypes";
import { messagesRef } from "../firestoreRefs";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import useAuthStore from "@/Context/authStore";

export const sendMessage = async (
  roomName: string,
  text: string
) => {
  const {currentCid,currentUser} = useAuthStore()
  const cid:string = useAuthStore((state)=>state.currentCid)!
  const uid:string = useAuthStore((state)=>state.currentUser)!.uid
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
      );
      await updateDoc(lastMessageRef, {lastMessage:message });
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
