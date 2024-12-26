"use client";
import React, { act, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCouple } from "@/Context/Couple-modified";
import { dateAndTimeToIso, dateToIso, IsoToDate } from "@/utils/dateUtils";

import { RequireAuth } from "@/components/RequireAuth";
import { addMonths, format, getDay, parse, startOfWeek, subMonths } from "date-fns";
import { calendar, calendarEvent, calendarEventShowing } from "@/types/types";
import { ja } from "date-fns/locale";
import { ensureCid, ensureString, ensureUser } from "@/utils/typeGare";
import { fetchCalendars } from "@/utils/Calendar/fetchCalendar";
import { fetchEvents } from "@/utils/Calendar/fetchEvents";
import { addCalendar } from "@/utils/Calendar/addCalendar";
import { addEvent } from "@/utils/Calendar/addEvents";
import { deleteEvent } from "@/utils/Calendar/deleteEvent";
import { uploadEditedEvent } from "@/utils/Calendar/updateEvent";
import DefaultToolbar from "@/components/calendarToolBar";

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
  const [events, setEvents] = useState<calendarEventShowing[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<calendarEventShowing | undefined>(
    undefined
  );
  const [updateEvent, setUpdateEvent] = useState<boolean>(false);
  const [editedEvent,setEditedEvent] = useState<calendarEventShowing|undefined>(undefined)

  //カレンダー用の状態
  const [description, setDescription] = useState<string>("");
  const [share, setShare] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("");
  const [calendars, setCalendars] = useState<calendar[]>([]);
  const [updateCalendar, setUpdateCalendar] = useState<boolean>(false);
  const [activeCalendar, setActiveCalendar] = useState<string | undefined>(
    undefined
  );

  // カレンダー表示用の状態 
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [currentView,setCurrentView] = useState<View>("month")

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate,1))
  }

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate,1))
  }

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
    await addEvent(cid, activeCalendar, {
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


  // イベントを選択
  const handleSelectEvent = (e: calendarEventShowing) => {
    setSelectedEvent(e);
    setEditedEvent(e)
  };

  // 選択したイベントを編集する
  const handleEditEvent = (e:React.ChangeEvent<HTMLInputElement>) => {
    ensureString(editedEvent?.eventId)
    const {name,value,checked} = e.target
    if(name=="start"||name=="end"){
      setEditedEvent({...editedEvent,[name]:IsoToDate(value)})
      return
    }
    if(name=="allDay"){
      console.log(checked)
      setEditedEvent({...editedEvent,allDay:e.target.checked})
      return
    }
    if(name=="startEnd"){
      setEditedEvent({...editedEvent,start: IsoToDate(value), end: IsoToDate(value)})
      return
    }
    setEditedEvent({ ...editedEvent,  [name]:value})
  }

  // 編集したイベントを反映させる
  const handleUpdateEvent = async () =>{
    if (!editedEvent || !activeCalendar){
      return
    }
    await uploadEditedEvent(cid,activeCalendar,editedEvent)
    alert("イベントを更新しました")
    setUpdateEvent(!updateEvent)
    setEditedEvent(undefined)
    setSelectedEvent(undefined)
  }

  // 選択したイベントを削除
  const handleDeleteEvent = async (cid:string,activeCalendar:string,eventId:string) =>{
    await deleteEvent(cid,activeCalendar,eventId)
    setUpdateEvent(!updateEvent);
    setSelectedEvent(undefined)
  }
  
  const handleNavigate = (newDate:Date) => {
    console.log("Navigated to:", newDate);
    setCurrentDate(newDate);
  }; 

  const handleViewChange = (newView:View) => {
    console.log("View changed to:", newView);
    setCurrentView(newView);
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

        {/* カレンダー表示 */}
        <div>
        {/* <button onClick={handlePreviousMonth}>Previous</button>
        <button onClick={() => setCurrentDate(new Date())}>Today</button>
        <button onClick={handleNextMonth}>Next</button> */}

          <Calendar
            localizer={localizer}
            events={events}
            date = {currentDate}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            onNavigate = {handleNavigate}
            onView={handleViewChange}
            view = {currentView}
            style={{ height: 500, width: "100%" }}
            components={{
              toolbar: DefaultToolbar, // カスタムツールバーを適用
            }}          />
        </div>

        {/* イベント選択時 */}
        <div>
          {(selectedEvent&&activeCalendar&&editedEvent) && (
            <div>
              <h3>Selected Event</h3>
              <p>{selectedEvent.title}</p>
              <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleUpdateEvent()
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
              <button onClick={()=>{handleDeleteEvent(cid,activeCalendar,selectedEvent.eventId)}}>削除</button>
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
