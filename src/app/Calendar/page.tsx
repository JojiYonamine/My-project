"use client";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCouple } from "@/Context/Couple-modified";
import { dateAndTimeToIso, dateToIso, IsoToDate } from "@/utils/dateUtils";

import { RequireAuth } from "@/components/RequireAuth";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { calendar, calendarEvent } from "@/types/types";
import { ja } from "date-fns/locale";
import { ensureCid, ensureUser } from "@/utils/typeGare";
import { fetchCalendars } from "@/utils/Calendar/fetchCalendar";
import { fetchEvents } from "@/utils/Calendar/fetchEvents";
import { addCalendar } from "@/utils/Calendar/addCalendar";
import { addEvent } from "@/utils/Calendar/addEvents";

const locales = {
  ja: ja,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  const cid = useCouple().cid;
  const user = useCouple().user;
  ensureUser(user);
  ensureCid(cid);
  const owner = user.uid;

  //イベント用の状態
  const [eventTitle, setEventTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [allDay, setAllDay] = useState<boolean>(false);
  const [events, setEvents] = useState<calendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<calendarEvent | undefined>(
    undefined
  );
  const [updateEvent, setUpdateEvent] = useState<boolean>(false);

  //カレンダー用の状態
  const [description, setDescription] = useState<string>("");
  const [share, setShare] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("");
  const [calendars, setCalendars] = useState<calendar[]>([]);
  const [updateCalendar, setUpdateCalendar] = useState<boolean>(false);
  const [activeCalendar, setActiveCalendar] = useState<string | undefined>(
    undefined
  );

  // カレンダー追加
  const addNewCalendr = async () => {
    console.log(updateCalendar)
    await addCalendar(cid, theme, {
      theme: theme,
      description: description,
      share: share,
      createdAt: new Date(),
    });
    setTheme("");
    setDescription("");
    setShare(false);
    setUpdateCalendar(!updateCalendar);
  };
  // カレンダー取得
  useEffect(() => {
    fetchCalendars(cid).then(setCalendars);
  }, [cid, updateCalendar]);

  // イベント追加
  const addNewEvent = async () => {
    if (!activeCalendar) {
      alert("カレンダーを選んでください");
      return;
    }
    addEvent(cid, activeCalendar, {
      title: eventTitle,
      createdBy: owner,
      createdAt: new Date(),
      allDay: allDay,
      start: startDate,
      end: endDate,
    });
    setEventTitle("");
    setUpdateEvent(!updateEvent);
  };



  // イベント取得
  useEffect(() => {
    if (!activeCalendar) {
      return;
    }
    fetchEvents(cid, activeCalendar).then(setEvents);
  }, [cid, activeCalendar, updateEvent]);

  const handleChangeShare = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShare(e.target.checked);
  };
  const handleChangeAllDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllDay(e.target.checked);
  };
  const handleSelectEvent = (e: calendarEvent) => {
    setSelectedEvent(e);
  };
  return (
    <div style={{ height: 500 }}>
      <div>
        {/* カレンダーリスト表示 */}
        <div>
          <select
            value={activeCalendar}
            onChange={(e) => setActiveCalendar(e.target.value)}
          >
            <option value={undefined}>テーマを選択</option>
            {calendars.map((calendar) => (
            <option key={calendar.theme} value={calendar.theme}>
              {calendar.theme}
            </option>
            ))}
          </select>
        </div>

        {/* カレンダー作成 */}
        <div>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              addNewCalendr();
            }}
          >
            <input
              type="text"
              placeholder="テーマを入力"
              value={theme}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTheme(e.target.value);
              }}
            />
            <label>
              <input
                type="checkbox"
                checked={share}
                onChange={handleChangeShare}
              />
              共有
            </label>
            <input
              type="text"
              placeholder="説明を入力"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(e.target.value);
              }}
            />
            <button type="submit">カレンダーを登録</button>
          </form>
        </div>

        {/* イベント登録 */}
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
        <div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            style={{ height: 500, width: "100%" }}
          />
          {selectedEvent && (
            <div>
              <h3>Selected Event</h3>
              <p>{selectedEvent.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CalendarFeat = () => {
  return (
    <RequireAuth>
      <MyCalendar />
    </RequireAuth>
  );
};
export default CalendarFeat;
