"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const MyDatePicker = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  return (
    <div>
      <h3>日付を選択してください:</h3>
      <DatePicker
        selected={startDate} // 選択された日付
        onChange={(date) => {
          if(date)
          setStartDate(date)}} // 日付変更時の処理
        dateFormat="EEE, LLL d, yyyy" // 表示形式
      />

      <DatePicker
          selected={selectedTime}
          onChange={(date) => setSelectedTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={10}
          timeCaption="時間"
          dateFormat="HH:mm"
           timeFormat="HH:mm"
          className="border p-2 rounded"
          placeholderText="時間を選択"
        />
      </div>

  );
};

export default MyDatePicker;
