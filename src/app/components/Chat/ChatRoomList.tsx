import useChatStore from "@/Context/chatStore";
import { CreateRoomButton } from "./createRoomButton";
import { useEffect } from "react";
import useAuthStore from "@/Context/authStore";

export const ChatRoomList = () => {
  const { userDoc, loading, currentCid } = useAuthStore();
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

  return (
    <div className="py-2 bg-pink-100 h-screen w-60">
      <h1 className="text-center w-full mb-2 bg-pink-500 text-white font-bold text-xl">
        Chat Rooms
      </h1>
      <CreateRoomButton className={"h-10 mb-4"} />
      {chatRooms.map((room) =>
        !(room.name==selectedChatRoom) ? (
            <button
            key={room.name}
            className="w-full bg-white border mb-1"
            onClick={() => {
              setSelectedChatRoom(room.name);
            }}
          >
            <h1>{room.name}</h1>
            <h1 className="text-sm text-gray-500">{`${userDoc?.data()?.name}: ${
              room.lastMessage.text
            }`}</h1>
          </button>
        ) : (
            <button
            key={room.name}
            className="w-full bg-pink-200 border mb-1 "
            onClick={() => {
              setSelectedChatRoom(room.name);
            }}
          >
            <h1>{room.name}</h1>
            <h1 className="text-sm text-gray-500">{`${userDoc?.data()?.name}: ${
              room.lastMessage.text
            }`}</h1>
          </button>
        )
      )}
    </div>
  );
};
