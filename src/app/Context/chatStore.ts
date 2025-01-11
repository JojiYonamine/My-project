import { chatRoom, message } from "@/types/chatTypes";
import { create } from "zustand";

interface chatStore {
  chatRooms: chatRoom[];
  selectedChatRoom: string | null;
  setChatRooms: (chatRoom: chatRoom[]) => void;
  setSelectedChatRoom: (selectedChatRoomName: string) => void;
  setLastMessage: (chatRoomName: string, lastMessage: message) => void;
}

const useChatStore = create<chatStore>((set)=>({
    chatRooms:[],
    selectedChatRoom:null,
    setChatRooms:((chatRooms) => set({chatRooms:chatRooms})),
    setSelectedChatRoom:((chatRoomName)=>set({selectedChatRoom:chatRoomName})),
    setLastMessage:((chatRoomName,lastMessage)=>
    set((state)=>({
        chatRooms:state.chatRooms.map((room)=>(
            room.name === chatRoomName
            ?{...room,lastMessage:lastMessage}:room
        ))
    })))
}))

export default useChatStore