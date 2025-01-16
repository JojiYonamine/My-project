// カレンダーリストのサイドバーを表示
import useAuthStore from "@/Context/authStore";
import useCalendarStore from "@/Context/calendarStore";
import { useEffect } from "react";

export const CalendarList: React.FC = () => {
  const { currentCid, loading } = useAuthStore();
  const {
    calendars,
    // sidebarOpen,
    // setSidebarOpen,
    // // selectedTheme,
    // setSelectedTheme
    initializeCalendar,
  } = useCalendarStore();
  //   const handleToggleSidebar = () => {
  //     setSidebarOpen(!sidebarOpen);

  //   };

//   カレンダーリスナーの開始・終了
  useEffect(() => {
    if (loading || !currentCid) {
      return;
    }
    console.log("カレンダー、リスナー開始");
    const unsubcribe = initializeCalendar(currentCid);
    return () => {
      unsubcribe();
      console.log("カレンダー、リスナー解除");
    };
  }, []);

  return (
    <div>
      {/* <select
        value={selectedTheme}
        onChange={(e) => setSelectedTheme(e.target.value)}
      > */}
      {/* ]        {calendars.map((calendar) => (
          <option key={calendar.id} value={calendar.theme}>
            {calendar.theme}
          </option>
        ))} */}
      {/* </select> */}
      {calendars.map((calendar) => (
        <h1 key={calendar.calendarId}>{calendar.theme}</h1>
      ))}
    </div>
  );
};
