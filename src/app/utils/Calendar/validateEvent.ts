// イベントのバリデーションを行う

import useCalendarStore from "@/Context/calendarStore";
import { calendarEvent } from "@/types/calendarTypes";
import { addDays, isBefore } from "date-fns";

type validateEventFunction = (event:calendarEvent) => string[];

export const useValidateEvent = (): validateEventFunction => {
  const calendarId = useCalendarStore(
    (state) => state.selectedCalendar
  )?.calendarId;
  const validateEvent = (event:calendarEvent) => {
    const errors: string[] = [];
    // カレンダーが未選択の時
    if (!calendarId) {
      errors.push("カレンダーを選択してください");
    }
    // ないと思うけどイベントが選択されていない時
    if (!event) {
      errors.push("イベントを選択してください");
      return errors;
    } else {
      const { title, end, start, allDay } = event;

      // タイトルが未入力の時
      if (!title.trim()) {
        errors.push("タイトルを入力してください");
      }
      // 終日でなく、終了日が開始日より早い時
      if (isBefore(end, start) && !allDay) {
        errors.push("終了日は開始日より後にしてください");
      }
      if (allDay && isBefore(addDays(end,1),start)){
        errors.push("終了日は開始日より後にしてください")
      }
      return errors;
    }
  };
  return validateEvent;
};
