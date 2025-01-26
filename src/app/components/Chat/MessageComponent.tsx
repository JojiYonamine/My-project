// メッセージの表示用

import useAuthStore from "@/Context/authStore";
import useChatStore from "@/Context/chatStore";
import { message } from "@/types/chatTypes";
import { updateMessage } from "@/utils/Chat/updateMessage";
import { timestampToString } from "@/utils/others/dateUtils";
import { useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface MessageComponentProps {
  message: message;
}

// メッセージがログイン中のユーザーのものならtrueを返す

export const MessageComponent: React.FC<MessageComponentProps> = ({
  message,
}) => {
  const uid = useAuthStore((state) => state.currentUser)!.uid;
  const cid = useAuthStore((state) => state.currentCid)!;
  const roomName = useChatStore((state) => state.selectedChatRoom)!;

  // 自分が送信者でtrue 相手が送信者でfalse
  const GetSender = (message: message): boolean => {
    if (message.sentBy == uid) {
      return true;
    } else {
      return false;
    }
  };
  const isSender = GetSender(message);
  const when = timestampToString(message.sentAt, true);
  // 吹き出しの三角の部分
  const triangle: string = isSender
    ? "absolute -right-4 bottom-2 h-0 w-0 border-transparent border-l-white border-l-[20px]  border-t-[10px] "
    : "absolute -left-3 bottom-1 h-0 w-0 border-transparent border-r-pink-50 border border-t-[20px]  border-r-[20px]";

  // メッセージが未読かつ送信者が相手の時updateMesasgeを呼び出す
  useEffect(() => {
    if (!message.read && !isSender) updateMessage(message, cid, roomName);
  }, []);

  const isRead: string =
    isSender && message.read
      ? "absolute -left-5 top-1 text-white"
      : "hidden h-0 w-0";
  return (
    // ボックス全体
    <div
      className={`${
        isSender
          ? "flex items-center justify-end mb-4"
          : "flex items-center mb-4"
      }`}
    >
      {/* 内容・吹き出し・既読表示 */}
      <div
        className={`relative rounded-xl py-3 px-4 mb-2 ${
          isSender ? "bg-white mr-5" : "bg-pink-50 ml-5"
        }`}
      >
        <span>{message.text}</span>
        <div
          className={`${
            isSender
              ? "absolute -bottom-1 -left-12 text-white"
              : "absolute -bottom-1 -right-10 text-pink-50"
          }`}
        >
          {when}
        </div>
        <div className={triangle} />
        <h1 className={isRead}>
          <IoMdCheckmarkCircleOutline size={15} />
        </h1>
      </div>
    </div>
  );
};
