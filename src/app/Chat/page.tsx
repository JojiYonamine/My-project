"use client";
import { auth, db } from "@/config/firebaseConfig";
import { useCouple } from "@/Context/Couple-modified";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
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
  const CoupleId = useCouple().cid;

  //未ログイン、単身者を弾く
  useEffect(() => {
    if (!auth.currentUser) {
      console.log("you need to login");
      root.push("/");
      return;
    }
    if (!CoupleId) {
      console.log("you need to make couple");
      root.push("/");
      return;
    }
  }, []);

  const currentUser = auth.currentUser;
  const [roomName, setRoomName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { id:string, text: string; sentBy: string; sentAt: string | null }[]
  >([]);
  const [chatRooms, setChatRooms] = useState<
    { id:string; name: string; createdAt: string | null }[]
  >([]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  // チャットルーム作成
  const CreateChatRoom = async (name: string | null) => {
    if (!CoupleId) {
      console.log("you need to make couple to create chat room");
      return;
    }
    if (!name) {
      console.log("you need to decide name");
      return;
    }
    try {
      const docRef = collection(db, "chatRooms");
      await addDoc(docRef, {
        name: name,
        cid: CoupleId,
        createdAt: serverTimestamp(),
      });
      console.log(`created the room name:${name} cid:${CoupleId}`);
    } catch (err: unknown) {
      console.error("エラーが発生", err);
    }
  };

  // チャットルーム監視
  useEffect(() => {
    if (!CoupleId) return;
    console.log("リスナー開始、チャットルーム");

    const ChatRoomsRef = collection(db, "chatRooms");
    const ChatRoomsQuery = query(ChatRoomsRef, where("cid", "==", CoupleId)); //ここで、ログイン中のユーザーのcidを持つチャットルームだけの条件を与えればおk
    const unsubcribe = onSnapshot(ChatRoomsQuery, (snapshot) => {
      const rooms = snapshot.docs.map((doc) => ({
        id: doc.id,
        name:doc.data().name,
        createdAt: doc.data().createdAt
          ? new Date(doc.data().createdAt.toDate()).toISOString() // タイムスタンプを文字列に変換
          : null,
      }));
      setChatRooms(rooms);
    });

    return () => {
      unsubcribe();
      console.log("リスナー解除、チャットルーム");
    };
  }, [CoupleId]);


  // メッセージ監視
  useEffect(() => {
    if (!activeRoom) {
      console.log("ルーム未選択");
      return;
    }
    console.log(`リスナー開始、メッセージズ、ルーム${activeRoom}`);
    const messagesRef = collection(db, "chatRooms", activeRoom, "messages");
    const unsubcribe = onSnapshot(messagesRef, (snapshot) => {
      const messagesInActiveRoom = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        sentBy: doc.data().sentBy,
        sentAt: doc.data().sentAt
          ? new Date(doc.data().sentAt.toDate()).toISOString() // タイムスタンプを文字列に変換
          : null,
      }));
      setMessages(messagesInActiveRoom);
    });
    return () => {
      unsubcribe();
      console.log(`リスナー解除、メッセージズ、ルーム${activeRoom}`);
    };
  }, [activeRoom]);

  //メッセージ送信
  const handleSubmitMessage = async (message: string | null) => {
    if (!activeRoom || !message || !currentUser) {
        console.log(
          `送信できません！ルーム: ${activeRoom}, メッセージ: ${message}, ユーザー: ${currentUser}`
        );
        return;
      }
    try {
      const messagesRef = collection(db, "chatRooms", activeRoom, "messages");
      await addDoc(messagesRef, {
        text: message,
        sentBy: currentUser.uid,
        sentAt: serverTimestamp(),
      });
      setMessage("");
    } catch (err: unknown) {
      console.error("エラー", err);
    }
  };

  return (
    <div>
      {/* チャットルーム表示 */}
      <div>
        <h1>Chat Rooms</h1>
        <ul>
          {chatRooms.map((room) => (
            <li key={room.id}>
              <button
                onClick={() => {
                  setActiveRoom(room.name);
                  console.log(room.name);
                }}
              >
                {room.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* チャットルーム作成 */}
      <div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            {
              CreateChatRoom(roomName);
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
          <button type="submit">送信</button>
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
                  {message.sentAt}
                </li>
              ))}
            </ul>
            {/* メッセージ送信 */}
            <div>
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  {
                    handleSubmitMessage(message);
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
  );
};
export default Chat;
