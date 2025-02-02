// 基本設定の入力フォーム

import { BasicCheckBox } from "@/components/buttons/basicCheckBox";
import { InputDate } from "@/components/inputs/inputDate";
import { InputFieldBold } from "@/components/inputs/inputFieldBold";
import { InputTime } from "@/components/inputs/inputTime";
import useCalendarEventStore from "@/Context/Calendar/calendarEventStore";
import { calendarEvent } from "@/types/calendarTypes";
import { useEditObject } from "@/utils/others/editObject";

export const BasicCustomForm = () => {
  const { selectedEvent, setSelectedEvent } = useCalendarEventStore();

  //   インプット編集時に実行する関数
  const editEvent = useEditObject<calendarEvent>(selectedEvent, setSelectedEvent);

  //   終日の変更を行う関数
  const toggleAllday = () => {
    const newAllDay = !selectedEvent?.allDay;
    const newEvent: calendarEvent = {
      ...selectedEvent,
      allDay: newAllDay,
    } as calendarEvent;
    setSelectedEvent(newEvent);
  };

  // 開始日と終了日を設定する関数
  const setStart = (date: Date) => {
    if (!selectedEvent) return;
    setSelectedEvent({ ...selectedEvent, start: date });
  };
  const setEnd = (date: Date) => {
    if (!selectedEvent) return;
    setSelectedEvent({ ...selectedEvent, end: date });
  };

  return (
    <div className="p-2">
      {/* タイトル */}
      <div className="w-full flex flex-col p-2 mb-2">
        <InputFieldBold
          type="text"
          name="title"
          value={selectedEvent?.title || ""}
          placeholder="タイトルを入力"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            editEvent(e);
          }}
        />
      </div>

      {/* 日付選択 */}
      <div className="flex flex-col w-full px-5 py-3">
        {/* 開始日時 */}
        <div className="flex justify-between items-center p-1 w-full">
          <h1 className="font-semibold">開始</h1>
          <div className="flex items-center justify-center gap-2">
            {selectedEvent && <InputDate date={selectedEvent.start} setDate={setStart} />}
            {/* <InputDate startOrEnd="start" /> */}
            {!selectedEvent?.allDay && <InputTime time={selectedEvent?.start} setTime={setStart} />}
          </div>
        </div>

        {/* 終了日時 */}
        <div className="flex justify-between items-center p-1 w-full">
          <h1 className="font-semibold">終了</h1>
          <div className="flex items-center justify-center gap-2">
            {selectedEvent && <InputDate date={selectedEvent.end} setDate={setEnd} />}
            {!selectedEvent?.allDay && <InputTime time={selectedEvent?.end} setTime={setEnd} />}
          </div>
        </div>
      </div>

      {/* 終日 */}
      <div className="w-full flex justify-end items-center gap-2 px-10 py-2 ">
        <BasicCheckBox onClick={() => toggleAllday()} checked={selectedEvent?.allDay} />
        <h1 className="font-semibold">終日</h1>
      </div>
    </div>
  );
};
