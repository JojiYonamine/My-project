// カレンダーリストのサイドバーを表示
import useAuthStore from "@/Context/authStore";
import useCalendarStore from "@/Context/calendarStore";
import { useEffect } from "react";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { CreateCalendar } from "./createCalendarButton";

export const CalendarList: React.FC = () => {
  const { currentCid, loading } = useAuthStore();
  const {
    calendars,
    sidebarOpen,
    setSidebarOpen,
    // // selectedTheme,
    setSelectedCalendar,
    initializeCalendar,
  } = useCalendarStore();

  // カレンダーリストの開閉
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
    <div
      className={`h-screen w-full overflow-y-auto bg-pink-100
      transition-all duration-500 ${
        sidebarOpen ? "max-w-60" : "max-w-0 opacity-50"
      }
      `}
    >
      <div className="mb-4 flex justify-between items-center p-2">
        <CreateCalendar/>
        <button onClick={() => handleToggleSidebar()}>
          <RxDoubleArrowLeft size={25} />
        </button>
      </div>
      {calendars.map((calendar) => (
        <button
          className={`w-full h-14 bg-pink-100 hover:bg-gray-100`}
          key={calendar.calendarId}
          onClick={() => setSelectedCalendar(calendar)}
        >
          {calendar.theme}
        </button>
      ))}
    </div>
  );
};
