// メインカレンダーで表示する際に使用する
// 繰り返しイベントを展開する関数

import { calendarEvent } from "@/types/calendarTypes";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  isBefore,
  isSameDay,
  isWithinInterval,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";

// 繰り返しイベントを展開する際の日付を得る関数
const getNextDate = (event: calendarEvent, currentStartDate: Date, currentEndDate: Date) => {
  const interval: number = event.repeat?.interval || 1;
  //   頻度に従って日付をずらす
  switch (event.repeat?.frequency) {
    case "daily":
      return {
        nextStartDate: addDays(currentStartDate, interval),
        nextEndDate: addDays(currentEndDate, interval),
      };
    case "weekly":
      return {
        nextStartDate: addWeeks(currentStartDate, interval),
        nextEndDate: addWeeks(currentEndDate, interval),
      };
    case "monthly":
      return {
        nextStartDate: addMonths(currentStartDate, interval),
        nextEndDate: addMonths(currentEndDate, interval),
      };
    case "yearly":
      return {
        nextStartDate: addYears(currentStartDate, interval),
        nextEndDate: addYears(currentEndDate, interval),
      };
    default:
      return { nextStartDate: currentStartDate, nextEndDate: currentEndDate };
  }
};

// 繰り返しイベントを展開する
export const expandRepeatedEvent = (events: calendarEvent[], startDate: Date, endDate: Date): calendarEvent[] => {
  const expandedEvents: calendarEvent[] = [];

  events.forEach((event) => {
    // 終了時間が00:00の時に23:59に変換する
    const correctEndDate =
      event.end.getHours() === 0 && event.end.getMinutes() === 0
        ? setHours(setMinutes(setSeconds(event.end, 59), 59), 23)
        : event.end;

    // イベントが繰り返しでない時そのまま返す
    if (!event.repeat) {
      expandedEvents.push({ ...event, end: correctEndDate });
      console.log(event,"added")
      return;
    }

    // 繰り返しイベントの、繰り返し先の開始・終了日時
    let currentStartDate: Date = new Date(event.start);
    let currentEndDate: Date = new Date(correctEndDate);
    console.log(event.title,"展開開始")
    console.log(event.repeat.noDate)

    // 開始日が、表示終了の日付を超えるまで実行
    while (isBefore(currentStartDate, event.repeat.endDate||endDate)) {
      console.log("開始日：",currentStartDate,"終了日：",currentEndDate)
      // 除外日のときスキップ
      if (event.repeat.noDate && event.repeat.noDate.some((date) => isSameDay(date, currentStartDate))) {
        console.log("スキップ",event.start)
        const { nextStartDate, nextEndDate } = getNextDate(event, currentStartDate, currentEndDate);
        currentStartDate = nextStartDate;
        currentEndDate = nextEndDate;
        continue;
      }

      //   開始日か、終了日が範囲内の時展開を実行
      if (
        isWithinInterval(currentStartDate, { start: startDate, end: endDate }) ||
        isWithinInterval(currentEndDate, { start: startDate, end: endDate })
      ) {
        expandedEvents.push({
          ...event,
          start: new Date(currentStartDate),
          end: new Date(currentEndDate),
        });
      }

      const { nextStartDate, nextEndDate } = getNextDate(event, currentStartDate, currentEndDate);
      currentStartDate = nextStartDate;
      currentEndDate = nextEndDate;
    }
  });
  console.log(expandedEvents)
  return expandedEvents;
};
