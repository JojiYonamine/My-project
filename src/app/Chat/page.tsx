"use client";
import { RequireAuth } from "@/components/RequireAuth";
import Sidebar from "@/components/Sidebar";
import useAuthStore from "@/Context/authStore";
import { message } from "@/types/types";
import { monitorChatRooms, monitorMessages } from "@/utils/Chat/monitor";
import { sendMessage } from "@/utils/Chat/sendMessage";
import { CreateChatRoom } from "@/utils/Chat/CreateChatRoom";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//ログイン、カップル登録していないと出てこないようにする。
//カップル登録してないユーザーが入れないようにしないとダメ
//一応、cidなしっ弾くようにするか
// メッセ送受作ったらlastSentMessageとlastSentByをつける
//ルームを常に監視するんじゃなくて、ルーム作成時のエフェクトで更新すればリソース減らせる気がする

const Chat = () => {
  //チャットルーム作成関数 ルーム名、CIDを必要とする。
  //console.log(CoupleId)
  const root = useRouter();
  const { userDoc, loading, currentUser } = useAuthStore();
  const [cid, setCid] = useState<string>("");
  const [uid, setUid] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<message[]>([]);
  const [chatRooms, setChatRooms] = useState<string[]>([]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean>(false);
  const [noRoom, setNoRoom] = useState<boolean>(false);

  // useAuthStoreのロード終わったら取得
  useEffect(() => {
    // RequireAuthで弾いてるからエラーならんはず
    const userData = userDoc?.data()!;
    if (!loading && currentUser) {
      setCid(userData.cid);
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
      setNoRoom(true);
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
      });
      return () => unsubcribe();
    }
  }, [activeRoom]);

  // チャットルーム監視
  // useEffect(() => {
  //   if (!CoupleId) return;
  //   console.log("リスナー開始、チャットルーム");

  //   const ChatRoomsRef = collection(db, "chatRooms");
  //   const ChatRoomsQuery = query(ChatRoomsRef, where("cid", "==", CoupleId)); //ここで、ログイン中のユーザーのcidを持つチャットルームだけの条件を与えればおk
  //   const unsubcribe = onSnapshot(ChatRoomsQuery, (snapshot) => {
  //     const rooms = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       name: doc.data().name,
  //       createdAt: doc.data().createdAt
  //         ? new Date(doc.data().createdAt.toDate()).toISOString() // タイムスタンプを文字列に変換
  //         : null,
  //     }));
  //     setChatRooms(rooms);
  //   });

  //   return () => {
  //     unsubcribe();
  //     console.log("リスナー解除、チャットルーム");
  //   };
  // }, []);

  // メッセージ監視
  // useEffect(() => {
  //   if (!activeRoom) {
  //     console.log("ルーム未選択");
  //     return;
  //   }
  //   console.log(`リスナー開始、メッセージズ、ルーム${activeRoom}`);
  //   const messagesRef = collection(db, "chatRooms", activeRoom, "messages");
  //   const unsubcribe = onSnapshot(messagesRef, (snapshot) => {
  //     const messagesInActiveRoom = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       text: doc.data().text,
  //       sentBy: doc.data().sentBy,
  //       sentAt: doc.data().sentAt
  //         ? new Date(doc.data().sentAt.toDate()).toISOString() // タイムスタンプを文字列に変換
  //         : null,
  //     }));
  //     setMessages(messagesInActiveRoom);
  //   });
  //   return () => {
  //     unsubcribe();
  //     console.log(`リスナー解除、メッセージズ、ルーム${activeRoom}`);
  //   };
  // }, [activeRoom]);

  return (
    <RequireAuth>
      <div className="flex justify-left">
        <Sidebar />
        <div className="w-16" />

          <div>
            <h1>Chat Rooms</h1>
            
              {chatRooms.map((room) => (
                  <button key={room} className="w-full bg-white border mb-1"
                    onClick={() => {
                      setActiveRoom(room);
                    }}
                  >
                    {room}
                  </button>
              ))}
          </div>
      

        {/* チャットルーム表示 */}

        {/* チャットルーム作成 */}
        <div className="h-screen bg-pink-100">
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              {
                console.log("send")
                CreateChatRoom(cid, roomName);
              }
              setRoomName("");
            }}
          >
            <input
              value={roomName}
              placeholder="ルーム名を入力"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRoomName(e.target.value);
              }}
            />
            <button type="submit">送信!</button>
          </form>
        </div>

        {/* メッセージ */}
        <div>
          {activeRoom ? (
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
                      console.log(activeRoom)
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
          ) : (
            <div>チャットルームを選択してください</div>
          )}
        </div>
      </div>
    </RequireAuth>
  );
};
export default Chat;
