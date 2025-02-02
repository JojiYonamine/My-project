// イベントの繰り返しを設定するフォーム

import BasicButton from "@/components/buttons/BasicButton";
import { BasicCheckBox } from "@/components/buttons/basicCheckBox";
import { InputDate } from "@/components/inputs/inputDate";
import { InputFieldBold } from "@/components/inputs/inputFieldBold";
import useCalendarEventStore from "@/Context/Calendar/calendarEventStore";
import { calendarEvent } from "@/types/calendarTypes";
import { useState } from "react";

export const RepeatCustuoForm = () => {
  const { selectedEvent, setSelectedEvent } = useCalendarEventStore();
  const [customEndDate, setCustomEndDate] = useState<boolean>(false);
  const [customInterval, setCustomInterval] = useState<boolean>(false);

  // 繰り返しを設定する関数
  const setRepeatCondition = (frequency: "daily" | "weekly" | "monthly" | "yearly", interval?: number): void => {
    if (!selectedEvent) return;
    const newRepeat: calendarEvent["repeat"] = {
      frequency: frequency,
      interval: interval || 1, //interval=0,nullのとき１
      endDate: null,
      noDate: null,
    };
    const newEvent: calendarEvent = { ...selectedEvent, repeat: newRepeat };
    setSelectedEvent(newEvent);
  };

  //   繰り返しの最終日を設定する
  const setRepeatEnd = (date: Date | null) => {
    if (!selectedEvent || !selectedEvent.repeat) return;
    setSelectedEvent({ ...selectedEvent, repeat: { ...selectedEvent.repeat, endDate: date } });
  };

  //   繰り返しの頻度を設定する
  const setInterval = (interval: number) => {
    if (!selectedEvent || !selectedEvent.repeat) return;
    if (interval > 10) {
      setSelectedEvent({ ...selectedEvent, repeat: { ...selectedEvent.repeat, interval: 1 } });
      return;
    }
    if (interval < 1) {
      setSelectedEvent({ ...selectedEvent, repeat: { ...selectedEvent.repeat, interval: 1 } });
    } else {
      setSelectedEvent({ ...selectedEvent, repeat: { ...selectedEvent.repeat, interval: interval } });
    }
  };

  //   現在設定中の頻度を返す
  const repeatDisabled = (frequency?: "daily" | "weekly" | "monthly" | "yearly" | "all"): boolean => {
    if (!selectedEvent || !selectedEvent.repeat || !selectedEvent.repeat.frequency) {
      return false;
    } else {
      if (selectedEvent.repeat.frequency === frequency || frequency === "all") {
        return true;
      } else {
        return false;
      }
    }
  };

//   頻度ごとにテキストを作成する
  const frequencyText = (): string => {
    if (!selectedEvent?.repeat?.frequency) return "エラー";
    const frequency = selectedEvent.repeat.frequency;
    switch (frequency) {
      case "daily":
        return "日ごと";
      case "weekly":
        return "週ごと";
      case "monthly":
        return "月ごと";
      case "yearly":
        return "年ごと";
    }
  };

  //   終了日の設定のオンオフ
  const toggleEnd = () => {
    const newEnd = customEndDate ? false : true;
    setCustomEndDate(newEnd);
    // 終了日を設定しない時null
    if (!newEnd) {
      setRepeatEnd(null);
    }
  };

//   頻度の設定のオンオフ
  const toggleInterval = () => {
    const newInt = customInterval ? false : true;
    setCustomInterval(newInt);
    // 頻度を設定しない時、デフォルトで１を使う
    if (!newInt) {
      setInterval(1);
    }
  };

  const customClassName: string = "bg-pink-500 text-white";

  return (
    <div className="w-full flex flex-col items-center p-2 ">
      {/* 頻度設定 */}
      <div className="flex w-full items-center justify-between gap-2">
        <BasicButton
          onClick={() => setRepeatCondition("yearly")}
          text="毎年"
          disabled={repeatDisabled("yearly")}
          disabledClassName={customClassName}
        />
        <BasicButton
          onClick={() => setRepeatCondition("monthly")}
          text="毎月"
          disabled={repeatDisabled("monthly")}
          disabledClassName={customClassName}
        />
        <BasicButton
          onClick={() => setRepeatCondition("weekly")}
          text="毎週"
          disabled={repeatDisabled("weekly")}
          disabledClassName={customClassName}
        />
        <BasicButton
          onClick={() => setRepeatCondition("daily")}
          text="毎日"
          disabled={repeatDisabled("daily")}
          disabledClassName={customClassName}
        />
      </div>

      {/* 詳細な繰り返し設定 */}
      <div
        className={`w-full flex flex-col gap-1 items-center ${
          repeatDisabled("all") ? "p-1" : "h-0 p-0"
        } overflow-hidden `}
      >
        {/* 繰り返し終了日 */}
        <div className="w-full flex justify-between items-center h-12">
          <div className="grow flex items-center gap-2">
            <BasicCheckBox onClick={() => toggleEnd()} checked={customEndDate} />
            <span className="font-semibold">繰り返し終了日</span>
          </div>
          <InputDate
            custom={`${!customEndDate && "hidden"}`}
            date={selectedEvent?.repeat?.endDate || new Date(2026, 12, 31)}
            setDate={setRepeatEnd}
          />
        </div>

        {/* 繰り返し頻度 */}
        <div className="w-full flex items-center justify-between h-12">
          <div className="grow flex items-center gap-2">
            <BasicCheckBox onClick={() => toggleInterval()} checked={customInterval} />
            <span className="font-semibold">繰り返し頻度</span>
          </div>
          <div className={`flex justify-end items-center gap-1 ${!customInterval && "hidden"}`}>
            <InputFieldBold
              type="number"
              size="w-12"
              justifyText="text-center"
              value={selectedEvent?.repeat?.interval || 1}
              onChange={(e) => setInterval(e.target.valueAsNumber)}
            />
            <span className="font-semibold">{frequencyText()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
