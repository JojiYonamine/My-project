import useAuthStore from "@/Context/authStore";
import useChatStore from "@/Context/chatStore";
import SendMessage from "@/utils/Chat/sendMessage";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";


export const ChatRoomInput: React.FC = () => {
  const selectedChatRoom = useChatStore((state) => state.selectedChatRoom)!;
  const [message, setMessage] = useState<string>("");
  const cid: string = useAuthStore((state) => state.currentCid)!;
  const uid: string = useAuthStore((state) => state.currentUser)!.uid;
  return (
    <form
      className="bg-white flex p-4 border-t border-b w-full max-h-[15vh]"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        {
          SendMessage(cid,uid,selectedChatRoom, message);
          setMessage("");
        }
      }}
    >
      <input
      className="bg-pink-200 p-4 rounded-xl text-2xl w-full"
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
