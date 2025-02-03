// カレンダーイベントの状態を管理する
import { calendarEvent } from "@/types/calendarTypes";
import { eventsRef } from "@/utils/others/firestoreRefs";
import { onSnapshot, Timestamp } from "firebase/firestore";
import { create } from "zustand";

interface calendarEventStore {
  // 選択中のカレンダーのイベント全体
  events: calendarEvent[];
  // 選択中のイベント
  selectedEvent: calendarEvent | null;
  // イベントの選択を行う
  setSelectedEvent: (event: calendarEvent | null) => void;
  // イベントを設定する
  setEvents: (events: calendarEvent[]) => void;
  // イベントリスナーを開始する
  initializeEvents: (cid: string, calendarId: string) => () => void;
}

const useCalendarEventStore = create<calendarEventStore>((set) => ({
  events: [],
  selectedEvent: null,
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setEvents: (events) => set({ events: events }),
  initializeEvents: (cid, calendarId) => {
    const unsubscribe = onSnapshot(eventsRef(cid, calendarId), (snapshot) => {
      const events: calendarEvent[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          eventId: doc.id,
          title: data.title ?? "error",
          createdBy: data.createdBy ?? "error",
          createdAt: data.createdAt.toDate() ?? new Date(),
          allDay: data.allDay ?? false,
          start: data.start.toDate() ?? new Date(),
          end: data.end.toDate() ?? new Date(),
          color: data.color ?? "#000000",
          advanced: data.advanced
            ? {
                location: data.advanced.location ?? null,
                memo: data.advanced.memo ?? null,
              }
            : null,
          repeat: data.repeat
            ? {
                frequency: data.repeat.frequency,
                interval: data.repeat.interval,
                endDate: data.repeat.endDate?.toDate() || null,
                noDate: data.repeat.noDate
                  ? data.repeat.noDate.map((timestamp: Timestamp) => timestamp.toDate())
                  : null,
              }
            : null,
        };
      });
      set({ events: events });
    });
    return unsubscribe;
  },
}));

export default useCalendarEventStore;
