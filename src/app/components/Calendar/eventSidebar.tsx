// イベントの作成・編集時に表示するサイドバー（右側）
//イベント新規作成時には、空のselectedCalendarを用意する

import useAuthStore from "@/Context/authStore";
import useCalendarStore from "@/Context/calendarStore";
import { calendarEvent } from "@/types/calendarTypes";
import { useEvent } from "@/utils/Calendar/eventHandler";
import { dateAndTimeToIso, dateToIso, IsoToDate } from "@/utils/dateUtils";
import { useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
// イベント作成時 createEventを呼び出す
// イベント編集時 editEventを呼び出す

interface EventSidebarProps {
  isEdit: boolean;
  //   onClose: () => void;
}

export const EventSidebar: React.FC<EventSidebarProps> = ({
  isEdit,
  //   onClose,
}) => {
  // 新規作成時には、selectedEventは、null
  const { selectedEvent, setSelectedEvent } = useCalendarStore();
  const uid = useAuthStore((state) => state.currentUser)!.uid;
  const handleEvent = useEvent(isEdit ? "edit" : "create");

  //   フォーム送信時に実行する関数
  const HandleEvent = () => {
    handleEvent();
    setSelectedEvent({
      ...selectedEvent,
      createdAt: new Date(),
    } as calendarEvent);
    setSelectedEvent(null);
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
    console.log(selectedEvent)

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

  useEffect(() => {
    if (!isEdit) {
      const newEvent: calendarEvent = {
        eventId: "",
        title: "",
        createdBy: uid,
        createdAt: new Date(),
        allDay: false,
        start: new Date(),
        end: new Date(),
        color: "",
      };
      setSelectedEvent(newEvent);
      console.log("selectedEvent initialized");
      console.log(newEvent);
      console.log(selectedEvent);
    }
  }, []);

  return (

    <div className={`h-screen w-full max-w-60`}>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          HandleEvent();
        }}
      >
        {/* タイトル */}
        <input
          type="text"
          name="title"
          placeholder="タイトルを入力"
          value={selectedEvent?.title || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            editEvent(e);
          }}
        />

        {/* 色 */}
        <input
          type="text"
          name="color"
          placeholder="色を入力"
          value={selectedEvent?.color || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            editEvent(e);
          }}
        />

        {/* 終日 */}
        <div>
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

        {selectedEvent?.allDay ? (
          <div>
            <input
              type="date"
              name="start"
              value={dateToIso(selectedEvent?.start || new Date())}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                editEvent(e);
              }}
            />
            <input
              type="date"
              name="end"
              value={dateToIso(selectedEvent?.end || new Date())}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                editEvent(e);
              }}
            />
          </div>
        ) : (
          <div>
            <input
              type="datetime-local"
              name="start"
              value={dateAndTimeToIso(selectedEvent?.start || new Date())}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                editEvent(e);
              }}
            />
            <input
              type="datetime-local"
              name="end"
              value={dateAndTimeToIso(selectedEvent?.end || new Date())}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                editEvent(e);
              }}
            />
          </div>
        )}
        <button type="submit">イベントを登録</button>
      </form>
    </div>
  );
};
