import { chatRoom, message } from "@/types/chatTypes";
import { timestampToDate } from "@/utils/others/dateUtils";
import { chatRoomsRef, messagesRef } from "@/utils/others/firestoreRefs";
import { limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { create } from "zustand";

interface chatStore {
  chatRooms: chatRoom[];
  selectedChatRoom: string | null;
  setSelectedChatRoom: (selectedChatRoomName: string) => void;
  initializeChatRoom: (cid: string) => () => void;
  messages: message[];
  initializeMessages: (cid: string, roomName: string) => () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const useChatStore = create<chatStore>((set) => ({
  chatRooms: [],
  messages: [],
  selectedChatRoom: null,
  setSelectedChatRoom: (chatRoomName) =>
    set({ selectedChatRoom: chatRoomName }),

  // チャットルームのリスナー開始用
  initializeChatRoom: (cid) => {
    const q = query(chatRoomsRef(cid), orderBy("lastMessage.sentAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms: chatRoom[] = snapshot.docs.map((doc) => ({
        name: doc.data().name,
        createdAt: doc.data().createdAt,
        lastMessage: doc.data().lastMessage,
      }));
      set({ chatRooms: rooms });
      console.log(rooms);
    });
    return unsubscribe;
  },

  //   メッセージのリスナー開始用
  initializeMessages: (cid, roomName) => {
    const q = query(
      messagesRef(cid, roomName),
      orderBy("sentAt", "desc"),
      limit(30)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: message[] = snapshot.docs.map((doc) => ({
        id: doc.data().id,
        text: doc.data().text,
        sentBy: doc.data().sentBy,
        sentAt: timestampToDate(doc.data().sentAt),
        read: doc.data().read,
      }));
      const sortedMessages = messages.reverse();
      set({ messages: sortedMessages });
    });
    return unsubscribe;
  },

  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

export default useChatStore;
