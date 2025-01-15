// 選択中のチャットルーム部分を担当するコンポーネント

import useAuthStore from "@/Context/authStore";
import useChatStore from "@/Context/chatStore";
import { useEffect } from "react";
import { ChatRoomInput } from "./ChatRoomInput";
import { ChatHeader } from "./ChatHeader";
import { ChatRoomMessageList } from "./ChatRoomMessageList";

export const ChatRoom:React.FC = () => {
  console.log("chat room rendered");
  const currentCid = useAuthStore((state) => state.currentCid)!;
  const loading = useAuthStore((state) => state.loading);
  const { selectedChatRoom, messages, initializeMessages } = useChatStore();

  // 選択中のチャットルームのメッセージのリスナーを開始・終了する
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

  // チャットルーム選択中のみメッセージを表示
  if (selectedChatRoom) {
    return (
      <div className="w-full flex flex-col h-screen bg-pink-100">
        {/* ヘッダー */}
        <ChatHeader />
        {/* チャット画面 */}
        <ChatRoomMessageList messages={messages}/>
        {/* メッセージ送信 */}
        <ChatRoomInput />
      </div>
    );
  }
  // チャットルーム未選択でサイドバーの開閉用ボタンだけ表示
  else{
    return(
      <ChatHeader />
    )
  }
};
