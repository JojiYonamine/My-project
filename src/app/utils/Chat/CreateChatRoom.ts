import { getDoc, setDoc } from "firebase/firestore";
import { chatRoomRef, chatRoomsRef } from "../firestoreRefs";

// export const checkRoom = async (
//   cid: string,
//   roomName: string
// ): Promise<boolean> => {
//   try {
//     console.log("ルームチャック開始");
//     const chatRoomSnapshot = await getDoc(chatRoomRef(cid, roomName));
//     if (!chatRoomSnapshot.exists()) {
//       return false;
//     } else {
//       return true;
//     }
//   } catch (err: unknown) {
//     console.log("checkRoom関数でエラー");
//     alert(err);
//     return false;
//   }
// };

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

  try {
    const createdAt = new Date();
    await setDoc(chatRoomRef(cid, roomName), {
      name: roomName,
      createdAt:createdAt
    });
    console.log("ルーム作成完了");
  } catch (err: unknown) {
    console.error("エラーが発生", err);
  }
};
