// チャットルームのメッセージを表示する

import { message } from "@/types/chatTypes";
import { MessageComponent } from "./MessageComponent";
import { groupMessagesByDate } from "@/utils/Chat/groupMessagesByDate";
import { useEffect, useRef } from "react";

// チャットルームのメッセージを表示する部分を担当
interface ChatRoomMessageListProps {
  messages: message[];
}

export const ChatRoomMessageList: React.FC<ChatRoomMessageListProps> = ({
  messages,
}) => {
  // 受け取ったメッセージを日付ごとにグループ化
  const messageGroup = groupMessagesByDate(messages);
  const scrollRef = useRef<HTMLDivElement>(null);

  //   メッセージが更新された時スクロール
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="min-h-0 flex flex-col overflow-y-auto flex-grow bg-pink-200"
    >
      {/* 日付ごとにグループ化したメッセージを日付ごとに表示、その日付の最初のメッセージの上に日付を表示 */}
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
