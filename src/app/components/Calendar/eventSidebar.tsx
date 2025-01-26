// イベントの作成・編集時に表示するサイドバー（右側）
//イベント新規作成時には、空のselectedCalendarを用意する
import useCalendarStore from "@/Context/calendarStore";
import { calendarEvent } from "@/types/calendarTypes";
import { useEvent } from "@/utils/Calendar/eventHandler";
import ColorPicker from "./colorPicker";
import { useValidateEvent } from "@/utils/Calendar/validateEvent";
import { InputDate, InputTime } from "@/Test/page";
import { CiCalendar } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { BasicCheckBox } from "../buttons/basicCheckBox";
import {  useEditObject } from "@/utils/others/editObject";


export const EventSidebar: React.FC = () => {
  // 新規作成時には、selectedEventは、null
  const { selectedEvent, setSelectedEvent, isEdit, selectedCalendar } =
    useCalendarStore();
  const handleEvent = useEvent(isEdit ? "edit" : "create");
  const validateEvent = useValidateEvent();


  //   フォーム送信時に実行する関数
  const HandleEvent = () => {
    handleEvent();
    setSelectedEvent({
      ...selectedEvent,
      createdAt: new Date(),
    } as calendarEvent);
  };

  //   インプット編集時に実行する関数
  const editEvent = useEditObject(selectedEvent,setSelectedEvent)

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
    console.log(errors);
    if (errors.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className={`duration-500 transition-all h-full w-full overflow-hidden ${
        selectedEvent ? "max-w-md  opacity-100" : "max-w-0 opacity-0"
      } `}
    >
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          HandleEvent();
        }}
      >
        {/* 基本設定 */}
        <div className="p-2">
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

          {/* 日付選択 */}
          <div className="flex flex-col w-full px-5 py-3">
            {/* 開始日時 */}
            <div className="flex justify-between items-center p-1 w-full">
              <h1 className="font-semibold">開始</h1>
              <div className="flex items-center justify-center gap-2">
                <InputDate startOrEnd="start" />
                {!selectedEvent?.allDay && <InputTime startOrEnd="start" />}
              </div>
            </div>

            {/* 終了日時 */}
            <div className="flex justify-between items-center p-1 w-full">
              <h1 className="font-semibold">終了</h1>
              <div className="flex items-center justify-center gap-2">
                <InputDate startOrEnd="end" />
                {!selectedEvent?.allDay && <InputTime startOrEnd="end" />}
              </div>
            </div>
          </div>

          {/* 終日 */}
          <div className="w-full flex justify-end items-center gap-2 px-10 py-2 ">
            <BasicCheckBox onClick={()=>toggleAllday()} checked={selectedEvent?.allDay}/>
            <h1 className="font-semibold">終日</h1>
          </div>
        </div>

        {/* 仕切り線 */}
        <hr className="border-gray-300 my-4" />

        {/* 色選択 */}
        <ColorPicker/>

        {/* 詳細設定 */}
        <div className="p-4 flex flex-col w-full gap-2">
          {/* カレンダー */}
          <div className="w-full flex justify-between items-center">
            <CiCalendar size={30} className="flex text-pink-400 mr-4" />
            <span className="bg-gray-100 grow p-1 text-center rounded-md font-semibold text-xl">
              {selectedCalendar?.theme}
            </span>
          </div>

          {/* 作成者 */}
          <div className="w-full flex justify-between items-center">
            <FaUserAlt size={30} className="flex text-pink-400 mr-4" />
            <span className="bg-gray-100 grow p-1 text-center rounded-md font-semibold text-xl">
              {selectedEvent?.createdBy}
            </span>
          </div>
        </div>

        {/* イベント作成・キャンセル */}
        <div className="flex w-full justify-end p-2">
          <button
            disabled={validateInputs()}
            className={`px-6 py-2 mx-1 rounded-md font-bold border ${
              validateInputs()
                ? "border-gray-200 text-gray-400"
                : "bg-pink-400  text-white border-pink-400 duration-500 hover:bg-pink-600 hover:border-pink-600"
            }`}
            type="submit"
          >
            作成
          </button>
          <button
            onClick={() => setSelectedEvent(null)}
            className={`px-2 py-2 mx-1 rounded-md border border-gray-200 text-gray-400 font-semibold tex duration-500 hover:text-gray-500 hover:bg-gray-300`}
            type="button"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};
