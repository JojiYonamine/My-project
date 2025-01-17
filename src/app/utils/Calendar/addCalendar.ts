// カレンダーを追加すカスタムフック
import { calendarsRef } from "../firestoreRefs";
import { doc, setDoc } from "firebase/firestore";
import { checkThemeExists } from "./checkThemeExists";
import { calendar } from "@/types/calendarTypes";
import useAuthStore from "@/Context/authStore";


type AddCalendarFunction = (
    theme: string,
    share: boolean,
    description: string | undefined
  ) => Promise<void>;

export const useAddCalendar = ():AddCalendarFunction => {
  const { currentCid, currentUser } = useAuthStore();
  const uid = currentUser!.uid;

  //   カレンダーに追加を行う関数
  const addCalendar = async (
    theme: string,
    share: boolean,
    description: string | undefined
  ) => {
    if (!currentCid || !uid) {
      return;
    }

    const calendarDocRef = doc(calendarsRef(currentCid));
    const createdAt = new Date();
    const exists = await checkThemeExists(currentCid, theme);
    if (exists) {
      alert("同テーマのカレンダーが存在します");
      return;
    }
    if (!theme) {
      alert("テーマを入力してください");
      return;
    }
    const calendar: calendar = {
      calendarId: calendarDocRef.id,
      theme: theme,
      description: description,
      share: share,
      createdAt: createdAt,
      createdBy: uid,
    };
    try {
      await setDoc(calendarDocRef, calendar);
      alert("カレンダーを登録しました");
    } catch (err: unknown) {
      console.log("エラー", err);
    }
  };

  return addCalendar;
};
