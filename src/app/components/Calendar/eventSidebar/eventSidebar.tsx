// イベントの作成・編集時に表示するサイドバー（右側）
//イベント新規作成時には、空のselectedCalendarを用意する
import { calendarEvent } from "@/types/calendarTypes";
import { useEvent } from "@/utils/Calendar/eventHandler";
import ColorPicker from "../colorPicker";
import useCalendarEventStore from "@/Context/Calendar/calendarEventStore";
import useCalendarUIStore from "@/Context/Calendar/calendarUIStore";
import { BasicCustomForm } from "./basicCustom";
import { DetailCustomForm } from "./detailCustom";
import { EventSidebarButtons } from "./eventSidbarButtons";
import { RepeatCustuoForm } from "./repeatCustom";

export const EventSidebar: React.FC = () => {
  // 新規作成時には、selectedEventは、null
  const { selectedEvent, setSelectedEvent } = useCalendarEventStore();
  const isEdit = useCalendarUIStore((state) => state.isEdit);
  const handleEvent = useEvent(isEdit ? "edit" : "create");

  //   フォーム送信時に実行する関数
  const HandleEvent = () => {
    setSelectedEvent({
      ...selectedEvent,
      createdAt: new Date(),
    } as calendarEvent);
    handleEvent();
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
        <BasicCustomForm />

        {/* 仕切り線 */}
        <hr className="border-gray-300 my-4" />

        {/* 色選択 */}
        <ColorPicker />

        {/* 詳細設定 */}
        <DetailCustomForm />

        {/* 繰り返し設定 */}
        <RepeatCustuoForm/>
        
        {/* イベント作成・キャンセル */}
        <EventSidebarButtons />
      </form>
    </div>
  );
};
