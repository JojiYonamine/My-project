// チャット機能
// useEffectはRequireAuthが終わってなくても開始されてしまうので注意

"use client";
import { RequireAuth } from "@/components/RequireAuth";
import Sidebar from "@/components/Sidebar";
import { ChatRoomList } from "@/components/Chat/ChatRoomList";
import { ChatRoom } from "@/components/Chat/ChatRoom";

const Chat = () => {
  console.log("chat rendered");
  return (
    // 未ログイン・カップル未登録を入れないようにする
    <RequireAuth>
      <div className="flex relative">
        {/* サイドバー */}
        <Sidebar />
        {/* チャットルームリスト（チャット用のサイドバー） */}
        <ChatRoomList />
        {/* チャットルーム（メッセージが表示される部分） */}
        <ChatRoom />
      </div>
    </RequireAuth>
  );
};
export default Chat;
