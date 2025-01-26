import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


interface InputDateProps<T> {
    obj: T;
    setObj: (newObj: T) => void;
    dateKey: keyof T; 
  }

export const InputDate= <T extends Record<string, any>>({
    obj,
    setObj,
    dateKey,
  }: InputDateProps<T>) => {
  return (
    <div className="bg-gray-100 rounded-md px-1">
      <DatePicker
        selected={obj[dateKey]}
        onChange={(date) => {
          if (date) {
            setObj({ ...obj, [dateKey]: date });
          }
        }}
        dateFormat="EEE, LLL d, yyyy"
        className="bg-gray-100 w-40 p-2 border-b-2 border-gray-100 focus:outline-none focus:border-pink-500 focus:font-semibold"
      />
    </div>
  );
};
