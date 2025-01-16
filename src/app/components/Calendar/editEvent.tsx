// イベントを編集する部分

import useCalendarStore from "@/Context/calendarStore";
import { calendarEvent } from "@/types/calendarTypes";
import { DeleteEvent } from "@/utils/Calendar/deleteEvent";
import { UploadEditedEvent } from "@/utils/Calendar/updateEvent";
import { dateAndTimeToIso, dateToIso, IsoToDate } from "@/utils/dateUtils";
import { useEffect, useState } from "react";

export const EditEvent: React.FC = () => {
  const selectedEvent = useCalendarStore((state) => state.selectedEvent);
  const setSelectedEvent = useCalendarStore((state) => state.setSelectedEvent);
  const selectedCalendar = useCalendarStore((state) => state.selectedCalendar);
  const [editedEvent, setEditedEvent] = useState<calendarEvent | null>(null);

  const handleEditEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedEvent) {
      return;
    }
    const { name, value, checked } = e.target;
    if (name == "start" || name == "end") {
      setEditedEvent({ ...editedEvent, [name]: IsoToDate(value) });
      return;
    }
    if (name == "allDay") {
      console.log(checked);
      setEditedEvent({ ...editedEvent, allDay: e.target.checked });
      return;
    }
    if (name == "startEnd") {
      setEditedEvent({
        ...editedEvent,
        start: IsoToDate(value),
        end: IsoToDate(value),
      });
      return;
    }
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  useEffect(()=>{
    if(!selectedEvent) return
    setEditedEvent(selectedEvent)
  },[])

  // 編集したイベントを反映させる
  const handleUpdateEvent = () => {
    UploadEditedEvent(editedEvent);
    alert("イベントを更新しました");
    setEditedEvent(null);
    setSelectedEvent(null);
  };

  // 選択したイベントを削除
  const handleDeleteEvent = () => {
    DeleteEvent();
    setSelectedEvent(null);
  };

  return (
    <div>
      {selectedEvent && selectedCalendar && editedEvent && (
        <div>
          <h3>Selected Event</h3>
          <p>{selectedEvent.title}</p>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleUpdateEvent();
            }}
          >
            <input
              type="text"
              placeholder="タイトルを入力"
              name="title"
              value={editedEvent.title}
              onChange={handleEditEvent}
            />
            <label>
              <input
                type="checkbox"
                name="allDay"
                checked={editedEvent.allDay}
                onChange={handleEditEvent}
              />
              終日
            </label>

            {editedEvent.allDay ? (
              <div>
                <input
                  type="date"
                  name="startEnd"
                  value={dateToIso(editedEvent.start)}
                  onChange={handleEditEvent}
                />
              </div>
            ) : (
              <div>
                <input
                  type="datetime-local"
                  placeholder="開始日時を入力"
                  name="start"
                  value={dateAndTimeToIso(editedEvent.start)}
                  onChange={handleEditEvent}
                />
                <input
                  type="datetime-local"
                  placeholder="終了日時を入力"
                  name="end"
                  value={dateAndTimeToIso(editedEvent.end)}
                  onChange={handleEditEvent}
                />
              </div>
            )}
            <button type="submit">イベントを更新</button>
          </form>
          <button
            onClick={() => {
              handleDeleteEvent(
              );
            }}
          >
            削除
          </button>
        </div>
      )}
    </div>
  );
};
