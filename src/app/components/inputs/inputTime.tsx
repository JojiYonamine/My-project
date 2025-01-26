import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputDateProps {
    time:Date|null|undefined,
    setTime:(date:Date)=>void
  }

export const InputTime: React.FC<InputDateProps> = ({time,setTime}) => {

    return (
      <div className="bg-gray-100 rounded-md px-1">
        <DatePicker
          selected={time}
          onChange={(time) => {
            if (time) {
              setTime(time)
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