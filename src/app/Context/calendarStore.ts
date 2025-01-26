// カレンダーの状態を管理する

import { calendar, calendarEvent } from "@/types/calendarTypes";
import { calendarsRef, eventsRef } from "@/utils/others/firestoreRefs";
import { onSnapshot } from "firebase/firestore";
import { create } from "zustand";

interface calendarStore {
  calendars: calendar[];
  selectedCalendar: calendar | null;
  events: calendarEvent[];
  selectedEvent: calendarEvent | null;
  setSelectedEvent: (event: calendarEvent | null) => void;
  sidebarOpen: boolean;
  setSelectedCalendar: (calendar: calendar | null) => void;
  initializeCalendar: (cid: string) => () => void;
  setEvents: (events: calendarEvent[]) => void;
  initializeEvents: (cid: string, calendarId: string) => () => void;
  setSidebarOpen: (open: boolean) => void;
  isEdit:boolean;
  setIsEdit:(isEdit:boolean)=>void
}

const useCalendarStore = create<calendarStore>((set) => ({
  calendars: [],
  selectedCalendar: null,
  events: [],
  selectedEvent: null,
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  sidebarOpen: true,
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
  setEvents: (events) => set({ events: events }),
  initializeEvents: (cid, calendarId) => {
    const unsubscribe = onSnapshot(eventsRef(cid, calendarId), (snapshot) => {
      const events: calendarEvent[] = snapshot.docs.map((doc) => ({
        eventId: doc.id,
        title: doc.data().title,
        createdBy: doc.data().createdBy,
        createdAt: doc.data().createdAt.toDate(),
        allDay: doc.data().allDay,
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
        color: doc.data().color,
      }));
      set({ events: events });
    });
    return unsubscribe;
  },
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  isEdit:false,
  setIsEdit:(isEdit) =>set({isEdit:isEdit})
}));

export default useCalendarStore;
