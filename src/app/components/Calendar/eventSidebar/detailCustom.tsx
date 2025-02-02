import useCalendarEventStore from "@/Context/Calendar/calendarEventStore";
import useCalendarStore from "@/Context/Calendar/calendarStore";
import { CiCalendar } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";

export const DetailCustomForm = () => {
  const  selectedEvent  = useCalendarEventStore((state)=>state.selectedEvent)
  const selectedCalendar = useCalendarStore((state)=>state.selectedCalendar)
  return (
    <div className="p-4 flex flex-col w-full gap-2">
      {/* カレンダー */}
      <div className="w-full flex justify-between items-center">
        <CiCalendar size={30} className="flex text-pink-400 mr-4" />
        <span className="bg-gray-100 grow p-1 text-center rounded-md font-semibold text-xl">
          {selectedCalendar?.theme}
        </span>
      </div>

      {/* 作成者 */}
      <div className="w-full flex justify-between items-center">
        <FaUserAlt size={30} className="flex text-pink-400 mr-4" />
        <span className="bg-gray-100 grow p-1 text-center rounded-md font-semibold text-xl">
          {selectedEvent?.createdBy}
        </span>
      </div>
    </div>
  );
};
