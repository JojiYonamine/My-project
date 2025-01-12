import { chatRoom, message } from "@/types/chatTypes";
import { chatRoomsRef, messagesRef } from "@/utils/firestoreRefs";
import { onSnapshot } from "firebase/firestore";
import { create } from "zustand";

interface chatStore {
  chatRooms: chatRoom[];
  selectedChatRoom: string | null;
  setSelectedChatRoom: (selectedChatRoomName: string) => void;
  initializeChatRoom: (cid: string) => () => void;
  messages: message[];
  initializeMessages: (cid: string, roomName: string) => () => void;
}

const useChatStore = create<chatStore>((set) => ({
  chatRooms: [],
  messages: [],
  selectedChatRoom: null,
  setSelectedChatRoom: (chatRoomName) =>
    set({ selectedChatRoom: chatRoomName }),

  // チャットルームのリスナー開始用
  initializeChatRoom: (cid) => {
    const unsubscribe = onSnapshot(chatRoomsRef(cid), (snapshot) => {
        const rooms:chatRoom[] = snapshot.docs.map((doc) => ({
          name:doc.data().name,
          createdAt:doc.data().createdAt,
          lastMessage:doc.data().lastMessage
        }));
        set({chatRooms:rooms})
        console.log(rooms)
      })
      return unsubscribe
  },

  //   メッセージのリスナー開始用
  initializeMessages: (cid, roomName) => {
    const unsubscribe = onSnapshot(messagesRef(cid, roomName), (snapshot) => {
        const messages: message[] = snapshot.docs.map((doc) => ({
          id: doc.data().id,
          text: doc.data().text,
          sentBy: doc.data().sentBy,
          sentAt: doc.data().sentAt,
          read: doc.data().read,
        }));
        set({messages:messages})
      });
    return unsubscribe;
  },
}));

export default useChatStore;
