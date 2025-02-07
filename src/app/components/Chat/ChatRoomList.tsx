// チャットルームリストを表示するコンポーネント

import useChatStore from "@/Context/chatStore";
import { CreateRoomButton } from "./createRoomButton";
import { useEffect } from "react";
import useAuthStore from "@/Context/authStore";
import { timestampToString } from "@/utils/others/dateUtils";
import { RxDoubleArrowLeft } from "react-icons/rx";

export const ChatRoomList = () => {
  const { loading, currentCid } = useAuthStore();
  const {
    chatRooms,
    selectedChatRoom,
    setSelectedChatRoom,
    initializeChatRoom,
    sidebarOpen,
    setSidebarOpen,
  } = useChatStore();

  //チャットルームリストのリスナーを開始・終了する
  useEffect(() => {
    if (loading || !currentCid) {
      return;
    }
    console.log("チャットルーム、リスナー開始");
    const unsubcribe = initializeChatRoom(currentCid);
    return () => {
      unsubcribe();
      console.log("チャットルーム、リスナー解除");
    };
  }, [currentCid]);

  // チャットルームリストの開閉用
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div
      className={`h-screen w-full overflow-hidden bg-pink-100
    transition-all duration-500 ${
      sidebarOpen ? "max-w-60" : "max-w-0 opacity-50"
    }
    `}
    >
      {/* チャットルーム作成・非表示 */}
      <div className="mb-4 flex justify-between items-center p-2">
        <CreateRoomButton className="items-center" />
        <button onClick={() => handleToggleSidebar()}>
          <RxDoubleArrowLeft size={25} />
        </button>
      </div>

      {/* チャットルームリスト表示 */}
      <div
        className={` transition-all duration-500 ${
          sidebarOpen ? "max-w-60" : "max-w-0 opacity-50"
        }`}
      >
        {/* チャットルームを表示 */}
        {chatRooms.map((room) => (
          <button
            key={room.name}
            className={
              room.name == selectedChatRoom
                ? "relative w-full bg-white flex justify-center h-14 overflow-hidden max-w-60 "
                : "relative w-full bg-pink-100 flex justify-center h-14 overflow-hidden max-w-60 hover:bg-gray-100"
            }
            onClick={() => {
              setSelectedChatRoom(room.name);
            }}
          >
            {/* ルーム名 */}
            <h1 className="absolute top-0 left-1">{room.name}</h1>
            {/* 最後のメッセージ */}
            <h1 className="absolute bottom-1 text-sm text-gray-500 overflow-hidden max-h-5">{`${room.lastMessage.text}`}</h1>
            {/* 最後のメッセージの送信された時間 */}
            <h1 className="absolute top-0 right-1 text-gray-400">
              {timestampToString(room.lastMessage.sentAt)}
            </h1>
          </button>
        ))}
      </div>
    </div>
  );
};
