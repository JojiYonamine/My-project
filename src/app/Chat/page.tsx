"use client";
import { RequireAuth } from "@/components/RequireAuth";
import Sidebar from "@/components/Sidebar";
import useAuthStore from "@/Context/authStore";
import { sendMessage } from "@/utils/Chat/sendMessage";
import { useEffect, useState } from "react";
import { CreateRoomButton } from "@/components/Chat/createRoomButton";
import useChatStore from "@/Context/chatStore";

//ログイン、カップル登録していないと出てこないようにする。
//カップル登録してないユーザーが入れないようにしないとダメ
//一応、cidなしっ弾くようにするか
// メッセ送受作ったらlastSentMessageとlastSentByをつける
//ルームを常に監視するんじゃなくて、ルーム作成時のエフェクトで更新すればリソース減らせる気がする
// useEffectはRequireAuthが終わってなくても開始されてしまうので注意

const Chat = () => {
  //チャットルーム作成関数 ルーム名、CIDを必要とする。
  //console.log(CoupleId)
  const { userDoc,loading, currentCid } = useAuthStore();
  const cid:string = currentCid!
  const uid:string = userDoc?.id!
  const [message, setMessage] = useState<string>("");
  const {
    chatRooms,
    selectedChatRoom,
    messages,
    setSelectedChatRoom,
    initializeChatRoom,
    initializeMessages,
  } = useChatStore();


  useEffect(() => {
    console.log("チャットルーム、リスナー開始");
    if(loading){
      return
    }
    const unsubcribe = initializeChatRoom(cid);
    return () => {
      unsubcribe();
      console.log("チャットルーム、リスナー解除");
    };
  }, [cid]);

  useEffect(() => {
    if (!selectedChatRoom||loading) {
      return;
    }
    console.log("メッセージ、リスナー開始");
    const unsubcribe = initializeMessages(cid, selectedChatRoom);

    return () => {
      unsubcribe();
      console.log("メッセージ、リスナー解除");
    };
  }, [selectedChatRoom]);

  

  return (
    <RequireAuth>
      <div className="flex justify-left relative">
        <Sidebar />
        {/* チャットルーム表示 */}
        <div className="py-2 bg-pink-100 h-screen w-60">
          <h1 className="rounded-2xl text-center w-full mb-2 bg-pink-500 text-white font-bold text-xl">
            Chat Rooms
          </h1>
          <CreateRoomButton className={"mb-4"} />
          {chatRooms.map((room) => (
            <button
              key={room.name}
              className="w-full bg-white border mb-1"
              onClick={() => {
                setSelectedChatRoom(room.name);
              }}
            >
              <h1>{room.name}</h1>
              {room.lastMessage.text}
            </button>
          ))}
        </div>

        {/* メッセージ */}
        <div>
          {selectedChatRoom && (
            <div>
              {/* メッセージ表示 */}
              <h1>this room is {selectedChatRoom}</h1>
              <ul>
                {messages.map((message) => (
                  <li key={message.id}>
                    内容:{message.text}、送信者:{message.sentBy}、送信日時:
                  </li>
                ))}
              </ul>
              {/* メッセージ送信 */}
              <div>
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    {
                      console.log(selectedChatRoom);
                      sendMessage(cid, uid, selectedChatRoom, message);
                      setMessage("");
                    }
                  }}
                >
                  <input
                    placeholder="メッセージを入力"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setMessage(e.target.value);
                    }}
                  />
                  <button type="submit">送信</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </RequireAuth>
  );
};
export default Chat;
