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
  return (
    <div
      className={`${
        isSender
          ? "bg-white flex items-center justify-end mb-2"
          : "bg-white flex items-center justify-end mb-2"
      }`}
    >
      <div className="relative rounded-xl bg-pink-200 p-2 mr-5">
        <h1 className="bg-pink-200">{message.text}</h1>
        <h1>{when}</h1>
        <h1>{message.sentBy}</h1>
        <div className="absolute -right-5 bottom-2 border-l-[20px] border-l-pink-200  h-0 w-0 border-t-[15px] border-b-[15px] border-transparent" />
        {/* <div
          className={`
            isSender
              ? "absolute inset-0 border-l-[6px] border-l-blue-500  h-0 w-0 border-t-[6px] border-b-[6px] border-transparent"
              : "absolute inset-0 border-r-[6px] border-r-gray-200  h-0 w-0 border-t-[6px] border-b-[6px] border-transparent"
            `}
        /> */}
      </div>
    </div>
  );
};
