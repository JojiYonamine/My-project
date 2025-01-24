// チャットルームを作成するための関数

import { getDoc, setDoc } from "firebase/firestore";
import { chatRoomRef } from "../others/firestoreRefs";
import { chatRoom } from "@/types/chatTypes";

// 同名のチャットルームの存在をチェックする関数
export const checkRoom = async (
  cid: string,
  roomName: string
): Promise<boolean> => {
  try {
    console.log("ルームチャック開始");
    const chatRoomSnapshot = await getDoc(chatRoomRef(cid, roomName));
    if (chatRoomSnapshot.exists()) {
      alert("同名のチャットルームが存在します！");
      return false;
    } else {
      return true;
    }
  } catch (err: unknown) {
    console.log("checkRoom関数でエラー");
    alert(err);
    return false;
  }
};

// チャットルーム作成関数
export const CreateChatRoom = async (cid: string, roomName: string) => {
  console.log("start creating room");

  if (!cid) {
    console.log("you need to make couple to create chat room");
    return;
  }
  if (roomName.trim().length < 1) {
    console.log("you need to decide the name");
    return;
  }

  const isAvailable: boolean = await checkRoom(cid, roomName);
  if (isAvailable == true) {
    try {
      const createdAt = new Date();
      const newChatRoom: chatRoom = {
        name: roomName,
        createdAt: createdAt,
        lastMessage: {
          id: "theFistLastMesssage",
          text: "theFistLastMesssage",
          sentBy: "developer",
          sentAt: createdAt,
          read: false,
        },
      };
      await setDoc(chatRoomRef(cid, roomName), newChatRoom);
    } catch (err: unknown) {
      console.error("CreateChatroomでエラー", err);
    }
  } else {
    return;
  }
};
