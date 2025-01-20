// カレンダーのヘッダー
import useCalendarStore from "@/Context/calendarStore";
import { format } from "date-fns";
import { useState } from "react";
import { ToolbarProps } from "react-big-calendar";
import { RxDoubleArrowRight } from "react-icons/rx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// interface naviateButtonProps {
//   onClick:()=>void
// }

// const naviateButton:React.FC<naviateButtonProps> = ({onClick}) =>{
//   return(

//   )
// }

export const CalendarHeader: React.FC<ToolbarProps> = ({
  date,
  onNavigate,
  onView,
}) => {
  const sidebarOpen = useCalendarStore((state) => state.sidebarOpen);
  const setSidebarOpen = useCalendarStore((state) => state.setSidebarOpen);
  // const selectedCalendar = useCalendarStore((state) => state.selectedCalendar);

  // month:true week:falseで管理する
  const [currentView, setCurrentView] = useState<boolean>(true);

  // 受け取った日付をフォーマットする関数
  const currentMonth = (currentDate: Date): string => {
    return format(currentDate, "MMMM, y");
  };

  // サイドバーの開閉用関数
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex justify-start gap-4 w-full items-center p-2 mb-2 h-full max-h-[7vh] bg-pink-100">
      {/* サイドバーの開閉用 */}
      <button
        className={`transition-all duration-500 ${sidebarOpen && "opacity-0"}`}
        disabled={sidebarOpen}
        onClick={() => handleToggleSidebar()}
      >
        <RxDoubleArrowRight size={25} />
      </button>
      
      <div className="flex h-full items-center gap-5">
        {/* 今日にナビゲートするボタン */}
        <button
          className="duration-500 font-bold text-gray-500 bg-white h-full px-5 rounded-md hover:bg-pink-200 hover:text-pink-500"
          onClick={() => onNavigate("TODAY")}
        >
          今日
        </button>

        {/* 前後のナビゲーション */}
        <div className="bg-white flex items-center rounded-xl h-full">
          {/* 前 */}
          <button
            className="h-full duration-500 text-gray-500 py-2 px-5 rounded-l-xl hover:bg-pink-200 hover:text-pink-500"
            onClick={() => onNavigate("PREV")}
          >
            <FaArrowLeft />
          </button>
          {/* 後 */}
          <button
            className="h-full duration-500 text-gray-500 py-2 px-5 rounded-r-xl hover:bg-pink-200 hover:text-pink-500"
            onClick={() => onNavigate("NEXT")}
          >
            <FaArrowRight />
          </button>
        </div>

        {/* ビュー切り替え */}
        <div className="h-full flex p-[2px] rounded-md bg-white justify-between gap-[1px]">
          {/* 月表示 */}
          <button
            className={`px-8 py-1 rounded-md duration-500 ${
              currentView
                ? "bg-pink-400 text-white font-bold"
                : "bg-white text-gray-500 font-semibold hover:text-pink-500 "
            } `}
            onClick={() => {
              onView("month");
              setCurrentView(true);
            }}
          >
            月
          </button>
          {/* 週表示 */}
          <button
            className={`px-8 py-1 rounded-md duration-500 ${
              currentView
                ? "bg-white text-gray-500 hover:text-pink-500 font-semibold"
                : "bg-pink-400 text-white font-bold"
            } `}
            onClick={() => {
              onView("week");
              setCurrentView(false);
            }}
          >
            週
          </button>
        </div>
      </div>
      {/* 表示中の月、年を表示 */}
      <span className="font-bold text-xl grow text-center">
        {currentMonth(date)}
      </span>
    </div>
  );
};
