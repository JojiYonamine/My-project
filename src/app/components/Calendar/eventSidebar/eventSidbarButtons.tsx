// イベント編集画面で送信・キャンセルのボタン
import useCalendarEventStore from "@/Context/Calendar/calendarEventStore";
import { useValidateEvent } from "@/utils/Calendar/validateEvent";

export const EventSidebarButtons = () => {
  const validateEvent = useValidateEvent();
  const { selectedEvent, setSelectedEvent } = useCalendarEventStore();

  // 入力内容にエラーがある時にtrueを返す
  const validateInputs = (): boolean => {
    const errors = validateEvent(selectedEvent!);
    // console.log(errors);
    if (errors.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
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
  );
};
