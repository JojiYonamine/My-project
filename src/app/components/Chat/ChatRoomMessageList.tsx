import { message } from "@/types/chatTypes";
import { MessageComponent } from "./MessageComponent";
import { groupMessagesByDate } from "@/utils/Chat/groupMessagesByDate";

// チャットルームのメッセージを表示する部分を担当
interface  ChatRoomMessageListProps{
    messages:message[]
}

export const ChatRoomMessageList:React.FC<ChatRoomMessageListProps> = ({messages}) => {
  const messageGroup = groupMessagesByDate(messages);

  return (
    //   <ul className="min-h-0 flex flex-col overflow-y-auto flex-grow bg-pink-200">
    //     {messages.map((message) => (
    //       <MessageComponent message={message} key={message.id} />
    //     ))}
    //   </ul>
    <div className="min-h-0 flex flex-col overflow-y-auto flex-grow bg-pink-200">
      {Object.entries(messageGroup).map(([date, messagesOnTheDate]) => (
        <div key={date}>
          {/* 日付*/}
          <div className="flex justify-center items-center">
            <h1 className="bg-pink-50 rounded-xl p-2 text-gray-500">{date}</h1>
            </div>
          {/* メッセージ */}
          {messagesOnTheDate.map((message: message) => (
            <MessageComponent message={message} key={message.id} />
          ))}
        </div>
      ))}
    </div>
  );
};
