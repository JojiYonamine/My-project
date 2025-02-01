// カレンダーの状態を管理する

import { calendar } from "@/types/calendarTypes";
import { calendarsRef } from "@/utils/others/firestoreRefs";
import { onSnapshot } from "firebase/firestore";
import { create } from "zustand";

interface calendarStore {
  // 全てのカレンダー
  calendars: calendar[];
  // 選択中のカレンダー
  selectedCalendar: calendar | null;
  // 選択中のカレンダーを設定
  setSelectedCalendar: (calendar: calendar | null) => void;
  // カレンダーリスナーの開始・解除
  initializeCalendar: (cid: string) => () => void;
}

const useCalendarStore = create<calendarStore>((set) => ({
  calendars: [],
  selectedCalendar: null,
  setSelectedCalendar: (theme) => set({ selectedCalendar: theme }),
  initializeCalendar: (cid) => {
    const unsubscribe = onSnapshot(calendarsRef(cid), (snapshot) => {
      const calendars: calendar[] = snapshot.docs.map((doc) => ({
        calendarId: doc.id,
        theme: doc.data().theme,
        description: doc.data().description,
        share: doc.data().share,
        createdAt: doc.data().createdAt,
        createdBy: doc.data().createdBy,
      }));
      set({ calendars: calendars });
    });
    return unsubscribe;
  },
}));

export default useCalendarStore;
