// イベントの作成・編集時に表示するサイドバー（右側）
//イベント新規作成時には、空のselectedCalendarを用意する
import useCalendarStore from "@/Context/calendarStore";
import { calendarEvent } from "@/types/calendarTypes";
import { useEvent } from "@/utils/Calendar/eventHandler";
import { dateAndTimeToIso, dateToIso, IsoToDate } from "@/utils/dateUtils";
import { FaRegCheckCircle } from "react-icons/fa";
import ColorPicker from "./colorPicker";
import { useValidateEvent } from "@/utils/Calendar/validateEvent";
// イベント作成時 createEventを呼び出す
// イベント編集時 editEventを呼び出す

export const EventSidebar: React.FC = () => {
  // 新規作成時には、selectedEventは、null
  const { selectedEvent, setSelectedEvent, isEdit } = useCalendarStore();
  const handleEvent = useEvent(isEdit ? "edit" : "create");
  const validateEvent = useValidateEvent();

  // 終日か否かで変更する用
  const inputType = selectedEvent?.allDay ? "date" : "datetime-local";
  const dateFormat = selectedEvent?.allDay ? dateToIso : dateAndTimeToIso;

  //   フォーム送信時に実行する関数
  const HandleEvent = () => {
    handleEvent();
    setSelectedEvent({
      ...selectedEvent,
      createdAt: new Date(),
    } as calendarEvent);
  };

  const validateValue = (name: string, value: string) => {
    if (name == "start" || name == "end") {
      return IsoToDate(value);
    } else {
      return value;
    }
  };

  //   インプット編集時に実行する関数
  const editEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const newEvent = {
      ...selectedEvent,
      [name]: validateValue(name, value),
    } as calendarEvent;
    setSelectedEvent(newEvent);
  };

  //   終日の変更を行う関数
  const toggleAllday = () => {
    const newAllDay = !selectedEvent?.allDay;
    const newEvent: calendarEvent = {
      ...selectedEvent,
      allDay: newAllDay,
    } as calendarEvent;
    setSelectedEvent(newEvent);
  };

  // 入力内容にエラーがある時にtrueを返す
  const validateInputs = (): boolean => {
    const errors = validateEvent(selectedEvent!);
    if (errors.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        HandleEvent();
      }}
      className={`duration-500 transition-all h-screen w-full ${
        selectedEvent ? "max-w-72 opacity-100" : "max-w-0 opacity-0"
      } `}
    >
      {/* タイトル */}
      <div className="w-full flex flex-col p-2 mb-2">
        <div className="bg-gray-100 px-2 pt-2 rounded-md">
          <input
            type="text"
            name="title"
            value={selectedEvent?.title || ""}
            placeholder="タイトルを入力"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              editEvent(e);
            }}
            className="w-full focus:outline-none bg-gray-100 px-1  focus:font-bold border-b-2 pb-1 border-gray-100 focus:border-pink-500"
          />
        </div>
      </div>

      {/* 色選択 */}
      <ColorPicker />

      {/* 終日 */}
      <div className="w-full flex justify-center items-center gap-2 px-5 my-5">
        <h1 className="font-semibold">終日</h1>
        <button type="button" onClick={() => toggleAllday()}>
          <FaRegCheckCircle
            size={30}
            className={`${
              selectedEvent?.allDay ? "text-pink-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>

      {/* 日付選択 */}
      <div>
        <input
          type={inputType}
          name="start"
          value={dateFormat(selectedEvent?.start || new Date())}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            editEvent(e);
          }}
        />
        <input
          type={inputType}
          name="end"
          value={dateFormat(selectedEvent?.end || new Date())}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            editEvent(e);
          }}
        />
      </div>
      <button type="submit" disabled={validateInputs()}>
        イベントを登録
      </button>
      <button type="button" onClick={() => setSelectedEvent(null)}>
        キャンセル
      </button>
    </form>
  );
};
