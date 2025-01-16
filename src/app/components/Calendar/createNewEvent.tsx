// イベントの新規作成ボタン

import { AddEvent } from "@/utils/Calendar/addEvents";
import { dateAndTimeToIso, dateToIso, IsoToDate } from "@/utils/dateUtils";
import { useState } from "react";

export const CreateNewEvent: React.FC = () => {
  const [eventTitle, setEventTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [allDay, setAllDay] = useState<boolean>(false);

  //   一旦仮置き、実装する時にはカラーピッカーを作る
  const [color, setColor] = useState<string>("");

  const handleChangeAllDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllDay(e.target.checked);
  };

//   イベント追加、状態のリセット
  const addNewEvent = () => {
    AddEvent(eventTitle, allDay, startDate, endDate, color);
    setEventTitle("");
  };

  return (
    <div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          addNewEvent();
        }}
      >
        <input
          type="text"
          placeholder="タイトルを入力"
          value={eventTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEventTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="色を入力"
          value={color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setColor(e.target.value);
          }}
        />
        <label>
          <input
            type="checkbox"
            checked={allDay}
            onChange={handleChangeAllDay}
          />
          終日
        </label>

        {allDay ? (
          <div>
            <input
              type="date"
              value={dateToIso(startDate)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStartDate(IsoToDate(e.target.value));
                setEndDate(IsoToDate(e.target.value));
              }}
            />
          </div>
        ) : (
          <div>
            <input
              type="datetime-local"
              placeholder="開始日時を入力"
              value={dateAndTimeToIso(startDate)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStartDate(IsoToDate(e.target.value));
              }}
            />
            <input
              type="datetime-local"
              placeholder="終了日時を入力"
              value={dateAndTimeToIso(endDate)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEndDate(IsoToDate(e.target.value));
              }}
            />
          </div>
        )}
        <button type="submit">イベントを登録</button>
      </form>
    </div>
  );
};
