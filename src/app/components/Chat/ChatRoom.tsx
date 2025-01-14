import useAuthStore from "@/Context/authStore";
import useChatStore from "@/Context/chatStore";
import { useEffect } from "react";
import { ChatRoomInput } from "./ChatRoomInput";
import { ChatHeader } from "./ChatHeader";
import { MessageComponent } from "./MessageComponent";

export const ChatRoom = () => {
  console.log("chat room rendered");
  const currentCid = useAuthStore((state) => state.currentCid)!;
  const loading = useAuthStore((state) => state.loading);

  const { selectedChatRoom, messages, initializeMessages } = useChatStore();

  useEffect(() => {
    if (loading || !selectedChatRoom) {
      return;
    }
    console.log("メッセージ、リスナー開始");
    const unsubcribe = initializeMessages(currentCid, selectedChatRoom);
    return () => {
      unsubcribe();
      console.log("メッセージ、リスナー解除");
    };
  }, [selectedChatRoom]);

  if(selectedChatRoom){
    return(
      <div className="w-full flex flex-col h-screen">
          <ChatHeader/>
          <ul className="min-h-0 flex flex-col overflow-y-auto flex-grow">
            {messages.map((message) => (
              // <li key={message.id} className="h-10">
              //   内容:{message.text}、送信者:{message.sentBy}、送信日時:
              // </li>
              <MessageComponent message={message} key={message.id}/>
            ))}
          </ul>
          <ChatRoomInput />
        </div>
    )
  }
};
