"use client";
import { RequireAuth } from "@/components/RequireAuth";
import Sidebar from "@/components/Sidebar";
import useAuthStore from "@/Context/authStore";
import { message } from "@/types/types";
import { monitorChatRooms, monitorMessages } from "@/utils/Chat/monitor";
import { sendMessage } from "@/utils/Chat/sendMessage";
import { useEffect, useState } from "react";
import { CreateRoomButton } from "@/components/Chat/createRoomButton";

//ログイン、カップル登録していないと出てこないようにする。
//カップル登録してないユーザーが入れないようにしないとダメ
//一応、cidなしっ弾くようにするか
// メッセ送受作ったらlastSentMessageとlastSentByをつける
//ルームを常に監視するんじゃなくて、ルーム作成時のエフェクトで更新すればリソース減らせる気がする

const Chat = () => {
  //チャットルーム作成関数 ルーム名、CIDを必要とする。
  //console.log(CoupleId)
  const { userDoc, loading, currentUser } = useAuthStore();
  const [cid, setCid] = useState<string>("");
  const [uid, setUid] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<message[]>([]);
  const [chatRooms, setChatRooms] = useState<string[]>([]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean>(false);


  // useAuthStoreのロード終わったら取得
  useEffect(() => {
    // RequireAuthで弾いてるからエラーならんはず
    const userData = userDoc?.data()
    if (!loading && currentUser) {
      setCid(userData!.cid);
      setUid(userDoc!.id);
      setOk(true);
    }
  }, [loading]);

  // チャットルーム監視
  useEffect(() => {
    if (!ok) {
      return;
    }
    console.log(cid);
    const unsubcribe = monitorChatRooms(cid, (updatedRooms) => {
      setChatRooms(updatedRooms);
    });
    if (chatRooms.length == 0) {
    }
    return () => unsubcribe();
  }, [ok]);

  // メッセージ監視
  useEffect(() => {
    if (!activeRoom) {
      return;
    } else {
      const unsubcribe = monitorMessages(cid, activeRoom, (updatedMessages) => {
        setMessages(updatedMessages);
        console.log(`${activeRoom}のリスナー開始`)
      });
      return () => {unsubcribe();console.log(`${activeRoom}のリスナー解除`)}
    }
  }, [activeRoom]);




  return (
    <RequireAuth>
      <div className="flex justify-left relative">
        <Sidebar />
        {/* チャットルーム表示 */}
        <div className="py-2 bg-pink-100 h-screen">
          <h1 className="rounded-2xl text-center w-full mb-2 bg-pink-500 text-white font-bold text-xl">Chat Rooms</h1>
          <CreateRoomButton className={'mb-4'}/>
          {chatRooms.map((room) => (
            <button
              key={room}
              className="w-full bg-white border mb-1"
              onClick={() => {
                setActiveRoom(room);
              }}
            >
              {room}
            </button>
          ))}
        </div>


        {/* メッセージ */}
        <div>
          {activeRoom && (
            <div>
              {/* メッセージ表示 */}
              <h1>this room is {activeRoom}</h1>
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
                      console.log(activeRoom);
                      sendMessage(cid, uid, activeRoom, message);
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
