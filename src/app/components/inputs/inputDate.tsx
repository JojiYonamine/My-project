import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputDateProps {
  date:Date|null,
  setDate:(date:Date)=>void
}

export const InputDate:React.FC<InputDateProps> = ({date,setDate})=>{
  if(!date) return
  return(
    <div className="bg-gray-100 rounded-md px-1">
       <DatePicker
        selected={date}
        onChange={(date) => {
          if (date) {
            setDate(date);
          }
        }}
        dateFormat="EEE, LLL d, yyyy"
        className="bg-gray-100 w-40 p-2 border-b-2 border-gray-100 focus:outline-none focus:border-pink-500 focus:font-semibold"
      />
    </div>
  )
}
// interface InputDateProps<T> {
//     obj: T|null;
//     setObj: (newObj: T) => void;
//     dateKey: keyof T; 
//   }

// export const InputDate= <T extends Record<string,any>>({
//     obj,
//     setObj,
//     dateKey,
//   }: InputDateProps<T>) => {
//     if(!obj) return
//   return (
//     <div className="bg-gray-100 rounded-md px-1">
//       <DatePicker
//         selected={obj[dateKey] as Date}
//         onChange={(date) => {
//           if (date) {
//             setObj({ ...obj, [dateKey]: date });
//           }
//         }}
//         dateFormat="EEE, LLL d, yyyy"
//         className="bg-gray-100 w-40 p-2 border-b-2 border-gray-100 focus:outline-none focus:border-pink-500 focus:font-semibold"
//       />
//     </div>
//   );
// };
