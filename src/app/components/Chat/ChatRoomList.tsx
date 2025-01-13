import useChatStore from "@/Context/chatStore";
import { CreateRoomButton } from "./createRoomButton";
import { useEffect } from "react";
import useAuthStore from "@/Context/authStore";
import { ChatRoomLisitItem } from "./ChatRoomListItem";
import { timestampToString } from "@/utils/dateUtils";

export const ChatRoomList = () => {
  console.log("chat room list rendered");

  const { loading, currentCid } = useAuthStore();
  const {
    chatRooms,
    selectedChatRoom,
    setSelectedChatRoom,
    initializeChatRoom,
  } = useChatStore();

  //   チャットルーム監視
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
  const isSelected: string =
    "relative w-full bg-white flex justify-center h-14 overflow-hidden max-w-60 ";
  const isNotSelected: string =
    "relative w-full bg-pink-100 flex justify-center h-14 overflow-hidden max-w-60 hover:bg-gray-100";

  return (
    <div className="py-2 bg-pink-100 h-screen">
      <h1 className="text-center w-full px-10 mb-2 max-w-60 bg-pink-500 text-white font-bold text-xl">
        Chat Rooms
      </h1>
      <CreateRoomButton className={"h-10 mb-4"} />
      {chatRooms.map((room) => (
        <button
          key={room.name}
          className={room.name == selectedChatRoom ? isSelected : isNotSelected}
          onClick={() => {
            setSelectedChatRoom(room.name);
          }}
        >
          <h1 className="absolute top-0 left-1">{room.name}</h1>
          <h1 className="absolute bottom-1 text-sm text-gray-500 overflow-hidden max-h-5">{`${room.lastMessage.text}`}</h1>
          <h1 className="absolute top-0 right-1 text-gray-400">
            {timestampToString(room.lastMessage.sentAt)}
          </h1>
        </button>
      ))}
    </div>
  );
};
