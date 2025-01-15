import useAuthStore from "@/Context/authStore";
import { message } from "@/types/chatTypes";
import { timestampToString } from "@/utils/dateUtils";

interface MessageComponentProps {
  message: message;
}

// メッセージがログイン中のユーザーのものならtrueを返す

export const MessageComponent: React.FC<MessageComponentProps> = ({
  message,
}) => {
  const uid = useAuthStore((state) => state.currentUser)!.uid;
  const GetSender = (message: message): boolean => {
    if (message.sentBy == uid) {
      console.log(`${message.sentBy}|||||,${uid}`);
      return true;
    } else {
      console.log(`${message.sentBy}|||||,${uid}`);
      return false;
    }
  };
  const isSender = GetSender(message);
  const when = timestampToString(message.sentAt, true);
  const triangle: string = isSender
    ? "absolute -right-4 bottom-2 h-0 w-0 border-transparent border-l-white border-l-[20px]  border-t-[10px] "
    : "absolute -left-3 bottom-1 h-0 w-0 border-transparent border-r-pink-50 border border-t-[20px]  border-r-[20px]";

  return (
    // ボックス
    <div
      className={`${
        isSender
          ? "flex items-center justify-end mb-4"
          : "flex items-center mb-4"
      }`}
    >
      {/* 内容・吹き出し */}
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
      </div>
    </div>
  );
};
