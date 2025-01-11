import { Unsubscribe } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { chatRoomRef, chatRoomsRef, messagesRef } from "../firestoreRefs";
import { message } from "@/types/types";



// コールバック関数で、roomsを受け取ること
export const monitorChatRooms = (
  cid: string,
  onRoomsUpdate: (rooms: string[]) => void
): Unsubscribe => {
  const unsubscribe = onSnapshot(chatRoomsRef(cid), (snapshot) => {
    const rooms = snapshot.docs.map((doc) => doc.data().name);
    onRoomsUpdate(rooms);
  });
  return unsubscribe;
};

export const monitorMessages = (
  cid: string,
  roomName: string,
  onMessagesUpdate: (messages: message[]) => void
): Unsubscribe => {
  const unsubcribe = onSnapshot(messagesRef(cid, roomName), (snapshot) => {
    const messages: message[] = snapshot.docs.map((doc) => ({
      id: doc.data().id,
      text: doc.data().text,
      sentBy: doc.data().sentBy,
      sentAt: doc.data().sentAt,
      read: doc.data().read,
    }));
    onMessagesUpdate(messages);
  });
  return unsubcribe;
};
