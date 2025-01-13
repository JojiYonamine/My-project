// チャットルームリストに表示するチャットルームのコンポーネント

import useChatStore from "@/Context/chatStore";
import { chatRoom, message } from "@/types/chatTypes";
import { timestampToString } from "@/utils/dateUtils";

interface ChatRoomListItemProps {
  room: chatRoom;
}

export const ChatRoomLisitItem: React.FC<ChatRoomListItemProps> = ({
  room,
}) => {
  const { setSelectedChatRoom, selectedChatRoom } = useChatStore();
  const isSelected:string = "relative w-full bg-white border flex justify-center h-14 overflow-hidden max-w-60"
  const isNotSelected:string = "relative w-full bg-pink-100 border flex justify-center h-14 overflow-hidden max-w-60"
  return (
        <button
          className={room.name == selectedChatRoom ? isSelected:isNotSelected}
          onClick={() => {
            setSelectedChatRoom(room.name);
          }}
        >
        <h1 className="absolute top-0 left-1">{room.name}</h1>
          <h1 className="absolute bottom-1 text-sm text-gray-500 overflow-hidden max-h-5">{`${room.lastMessage.text}`}</h1>
          <h1 className="absolute top-0 right-1 text-gray-400">{timestampToString(room.lastMessage.sentAt)}</h1>
        </button>
  );
};
