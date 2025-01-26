// メッセージを日付ごとにグループ化する関数

import { message } from "@/types/chatTypes";
import { format } from "date-fns";

export const groupMessagesByDate = (messages: message[]) => {
  return messages.reduce((acc, message) => {
    const dateKey = format(message.sentAt, "yyyy年M月d日");
    // 同じdatekeyが存在しない時空配列を作る
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    // 同じ日付のメッセージを該当するdatekeyの配列に入れる
    acc[dateKey].push(message);
    return acc;
    //   キーがdateKeyで、要素としてメッセージ配列を持つ型を主張
  }, {} as Record<string, message[]>);
};
