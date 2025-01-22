"use client";
import useCalendarStore from "@/Context/calendarStore";
import { calendarEvent } from "@/types/calendarTypes";
import { format } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface inputDateTimeProps {
  startOrEnd: "start" | "end";
}

export const InputDate: React.FC<inputDateTimeProps> = ({ startOrEnd }) => {
  const selectedEvent = useCalendarStore((state) => state.selectedEvent);
  const setSelectedEvent = useCalendarStore((state) => state.setSelectedEvent);
  const startOrEndDate = selectedEvent?.[startOrEnd];
  return (
    <div className="bg-gray-100 rounded-md px-1">
      <DatePicker
        selected={startOrEndDate}
        onChange={(date) => {
          if (date) {
            setSelectedEvent({ ...selectedEvent!, [startOrEnd]: date });
          }
        }}
        dateFormat="EEE, LLL d, yyyy"
        className="bg-gray-100 w-40 p-2 border-b-2 border-gray-100 focus:outline-none focus:border-pink-500 focus:font-semibold"
      />
    </div>
  );
};

export const InputTime: React.FC<inputDateTimeProps> = ({ startOrEnd }) => {
  const selectedEvent = useCalendarStore((state) => state.selectedEvent);
  const setSelectedEvent = useCalendarStore((state) => state.setSelectedEvent);
  const startOrEndTime = selectedEvent?.[startOrEnd];
  return (
    <div className="bg-gray-100 rounded-md px-1">
      <DatePicker
        selected={startOrEndTime}
        onChange={(time) => {
          if (time) {
            setSelectedEvent({ ...selectedEvent!, [startOrEnd]: time });
          }
        }}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={10}
        timeCaption="時間"
        dateFormat="HH:mm"
        timeFormat="HH:mm"
        placeholderText="時間を選択"
        className="bg-gray-100 w-16 text-center p-2 border-b-2 border-gray-100 focus:outline-none focus:border-pink-500 focus:font-semibold"
      />
    </div>
  );
};

// const MyDatePicker = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [selectedTime, setSelectedTime] = useState<Date | null>(null);

//   return (
//     <div>
//       <h3>日付を選択してください:</h3>
//       <DatePicker
//         selected={startDate} // 選択された日付
//         onChange={(date:Date) => {
//           if(date)
//           setStartDate(date)}} // 日付変更時の処理
//         dateFormat="EEE, LLL d, yyyy" // 表示形式
//       />

//       <DatePicker
//           selected={selectedTime}
//           onChange={(date) => setSelectedTime(date)}
//           showTimeSelect
//           showTimeSelectOnly
//           timeIntervals={10}
//           timeCaption="時間"
//           dateFormat="HH:mm"
//            timeFormat="HH:mm"
//           className="border p-2 rounded"
//           placeholderText="時間を選択"
//         />
//       </div>

//   );
// };

// format

// export default MyDatePicker;
