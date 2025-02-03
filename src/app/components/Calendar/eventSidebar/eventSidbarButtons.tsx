// イベント編集画面で送信・キャンセルのボタン
import BasicButton from "@/components/buttons/BasicButton";
import useCalendarEventStore from "@/Context/Calendar/calendarEventStore";
import useCalendarUIStore from "@/Context/Calendar/calendarUIStore";
import { useDeleteEvent } from "@/utils/Calendar/deleteEvent";
import { useValidateEvent } from "@/utils/Calendar/validateEvent";

export const EventSidebarButtons = () => {
  const validateEvent = useValidateEvent();
  const { selectedEvent, setSelectedEvent } = useCalendarEventStore();
  const isEdit = useCalendarUIStore((state) => state.isEdit);
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

  const text = isEdit ? "編集" : "作成";

  const deleteEvent = useDeleteEvent();

  const DeleteOption = () => {
    return (
      // <div className={`absolute z-20 flex flex-col gap-1 bg-black top-0  bottom-0  ${deleteOption&&"hidden"} `}>
      <div className="w-full flex-items-center">
        {selectedEvent?.repeat && (
          <div className="flex items-center w-full justify-between gap-2">
            <BasicButton
              onClick={() => {
                deleteEvent("delete");
                setSelectedEvent(null);
              }}
              text="全てを削除"
            />
            <BasicButton
              onClick={() => {
                deleteEvent("setEndDate");
                setSelectedEvent(null);
              }}
              text="以降を削除"
            />
            <BasicButton
              onClick={() => {
                deleteEvent("setNoDate");
                setSelectedEvent(null);
              }}
              text="この予定を削除"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
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
          {text}
        </button>
        {!selectedEvent?.repeat && (
          <BasicButton
            size="h-12 w-20"
            onClick={() => {
              deleteEvent("delete");
              setSelectedEvent(null);
            }}
            text="削除"
          />
        )}

        <button
          onClick={() => setSelectedEvent(null)}
          className={`px-2 py-2 mx-1 rounded-md border border-gray-200 text-gray-400 font-semibold tex duration-500 hover:text-gray-500 hover:bg-gray-300`}
          type="button"
        >
          キャンセル
        </button>
      </div>
      {isEdit && <DeleteOption />}
    </div>
  );
};
