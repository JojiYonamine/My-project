import { message } from "@/types/chatTypes";
import { format } from "date-fns";

export   const groupMessagesByDate = (messages: message[]) => {
    return messages.reduce((acc, message) => {
      const dateKey = format(message.sentAt, "yyyy年M月d日");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(message);
      return acc;
      //   キーがdateKeyで、要素としてメッセージ配列を持つ型を主張
    }, {} as Record<string, message[]>);
  };