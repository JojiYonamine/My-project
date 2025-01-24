// カレンダーのヘッダー
import useCalendarStore from "@/Context/calendarStore";
import { addMonths, addWeeks, format, subMonths, subWeeks } from "date-fns";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useShowCalendarStore from "@/Context/showCalendarStore";
import { ToggleSidebarButton } from "../buttons/toggleSidebarButton";

export const CalendarHeader: React.FC = ({}) => {
  const sidebarOpen = useCalendarStore((state) => state.sidebarOpen);
  const setSidebarOpen = useCalendarStore((state) => state.setSidebarOpen);
  const { currentView, setCurrentView, currentDate, setCurrentDate } =
    useShowCalendarStore();

  // 受け取った日付をフォーマットする関数
  const currentMonth = (currentDate: Date): string => {
    return format(currentDate, "MMMM, y");
  };

  // サイドバーの開閉用関数
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const next = () => {
    if (currentView == "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };

  const prev = () => {
    if (currentView == "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  console.log(currentView);

  return (
    <div className="flex justify-start gap-4 w-full items-center p-2 h-full max-h-[7vh] bg-pink-100">
      {/* サイドバーの開閉用 */}
      <ToggleSidebarButton onClick={()=>handleToggleSidebar()} isOpen={sidebarOpen}/>

      <div className="flex h-full items-center gap-5">
        {/* 今日にナビゲートするボタン */}
        <button
          className="duration-500 font-bold text-gray-500 bg-white h-full px-5 rounded-md hover:bg-pink-200 hover:text-pink-500"
          onClick={() => setCurrentDate(new Date())}
        >
          今日
        </button>

        {/* 前後のナビゲーション */}
        <div className="bg-white flex items-center rounded-xl h-full">
          {/* 前 */}
          <button
            className="h-full duration-500 text-gray-500 py-2 px-5 rounded-l-xl hover:bg-pink-200 hover:text-pink-500"
            onClick={() => prev()}
          >
            <FaArrowLeft />
          </button>
          {/* 後 */}
          <button
            className="h-full duration-500 text-gray-500 py-2 px-5 rounded-r-xl hover:bg-pink-200 hover:text-pink-500"
            onClick={() => next()}
          >
            <FaArrowRight />
          </button>
        </div>

        {/* ビュー切り替え */}
        <div className="h-full flex p-[2px] rounded-md bg-white justify-between gap-[1px]">
          {/* 月表示 */}
          <button
            className={`px-8 py-1 rounded-md duration-500 ${
              currentView == "month"
                ? "bg-pink-400 text-white font-bold"
                : "bg-white text-gray-500 font-semibold hover:text-pink-500 "
            } `}
            onClick={() => {
              setCurrentView("month");
            }}
          >
            月
          </button>
          {/* 週表示 */}
          <button
            className={`px-8 py-1 rounded-md duration-500 ${
              currentView == "week"
                ? "bg-pink-400 text-white font-bold"
                : "bg-white text-gray-500 hover:text-pink-500 font-semibold"
            } `}
            onClick={() => {
              setCurrentView("week");
            }}
          >
            週
          </button>
        </div>
      </div>
      {/* 表示中の月、年を表示 */}
      <span className="font-bold text-xl grow text-center">
        {currentMonth(currentDate)}
      </span>
    </div>
  );
};
