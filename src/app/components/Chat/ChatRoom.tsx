import useAuthStore from "@/Context/authStore";
import useChatStore from "@/Context/chatStore";
import { useEffect } from "react";
import { ChatRoomInput } from "./ChatRoomInput";
import { ChatHeader } from "./ChatHeader";
import { ChatRoomMessageList } from "./ChatRoomMessageList";

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

  if (selectedChatRoom) {
    return (
      <div className="w-full flex flex-col h-screen bg-pink-100">
        {/* ヘッダー */}
        <ChatHeader />
        {/* チャット画面 */}
        <ChatRoomMessageList messages={messages}/>
        {/* <ul className="min-h-0 flex flex-col overflow-y-auto flex-grow bg-pink-200">
          {messages.map((message) => (
            <MessageComponent message={message} key={message.id} />
          ))}
        </ul> */}
        {/* 入力 */}
        <ChatRoomInput />
      </div>
    );
  }
};
