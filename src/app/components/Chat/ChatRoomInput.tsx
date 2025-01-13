import useChatStore from "@/Context/chatStore";
import { sendMessage } from "@/utils/Chat/sendMessage";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";


export const ChatRoomInput: React.FC = () => {
  const selectedChatRoom = useChatStore((state) => state.selectedChatRoom)!;
  const [message, setMessage] = useState<string>("");
  return (
    <form
      className="bg-white flex justify-left p-4 border-t border-b w-full absolute bottom-0"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        {
          sendMessage(selectedChatRoom, message);
          setMessage("");
        }
      }}
    >
      <input
      className="bg-pink-200 p-4 rounded-xl text-xl w-full"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setMessage(e.target.value);
        }}
      />
      <button type="submit" className="mx-2">
      <IoIosSend size={40} className="text-pink-300"/>
      </button>
    </form>
  );
};
