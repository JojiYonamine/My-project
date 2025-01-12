"use client";
import { RequireAuth } from "@/components/RequireAuth";
import Sidebar from "@/components/Sidebar";
import useAuthStore from "@/Context/authStore";
import { sendMessage } from "@/utils/Chat/sendMessage";
import { useEffect, useState } from "react";
import { CreateRoomButton } from "@/components/Chat/createRoomButton";
import useChatStore from "@/Context/chatStore";
import { ChatRoomList } from "@/components/Chat/ChatRoomList";
import { ChatRoom } from "@/components/Chat/ChatRoom";

//ログイン、カップル登録していないと出てこないようにする。
//カップル登録してないユーザーが入れないようにしないとダメ
//一応、cidなしっ弾くようにするか
// メッセ送受作ったらlastSentMessageとlastSentByをつける
//ルームを常に監視するんじゃなくて、ルーム作成時のエフェクトで更新すればリソース減らせる気がする
// useEffectはRequireAuthが終わってなくても開始されてしまうので注意

const Chat = () => {
  return (
    <RequireAuth>
      <div className="flex justify-left relative">
        <Sidebar />
        <ChatRoomList/>
        <ChatRoom/>
      </div>
    </RequireAuth>
  );
};
export default Chat;
