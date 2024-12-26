'use client'
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { DefaultToolbar } from "@/components/calendarToolBar";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");

  const handleNavigate = (newDate) => {
    console.log("Navigated to:", newDate);
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView) => {
    console.log("View changed to:", newView);
    setCurrentView(newView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      date={currentDate}
      view={currentView}
      onNavigate={handleNavigate}
      onView={handleViewChange}
      components={{
        toolbar: DefaultToolbar,
      }}
      style={{ height: 500 }}
    />
  );
};

export default MyCalendar;

// "use client"

// import { dateToIso, IsoToDate } from "@/utils/dateUtils";
// import { useState } from "react"

// const Test = () => {
//     const [isChecked, setIsChecked] = useState(false);

//     const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setIsChecked(e.target.checked);
//     };
//     const [startDate,setStartDate]= useState<Date>(new Date())
  
//     return (
//       <div>
//         <label>
//           <input
//             type="checkbox"
//             checked={isChecked} // チェック状態を制御
//             onChange={handleCheckboxChange} // 状態を更新
//           />
//           チェックボックス
//         </label>
//         <p>{isChecked ? "チェックされています" : "チェックされていません"}</p>
//         <input
//         type="datetime-local"
//         placeholder="開始日時を入力"
//         value={dateToIso(startDate)}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//             setStartDate(IsoToDate(e.target.value));
//             console.log(e)
//         }}
//         />
//       </div>
//     );
       
// }

// export default Test

// "use client"

// import { format } from "date-fns";

// const Today = () => {
//   const today = new Date();
//   const typeOrigin = typeof(today)
//   const formatedDate = format(today,'yyyy-MM-dd')
//   const formatedDate = format(today,'yyyy-MM-dd-HH-mm-ss')
//   console.log()

// }

// import { CoupleProvider } from "@/Context/Couple-modified";
// import { useState } from "react";

// const TestComponent = () => {
//   const [showProvider, setShowProvider] = useState(false);

//   return (
//     <div>
//       <button onClick={() => setShowProvider((prev:boolean) => !prev)}>Toggle Provider</button>
//       {showProvider?(
//         <CoupleProvider>
//           <div>Provider is Active</div>
//         </CoupleProvider>
//       ):(<div>Provider is Inactive</div>
//       )}
//     </div>
//   );
// };

// export default TestComponent;

// import { useCouple } from "@/Context/Couple-modified"
// export default function Test () {
//   const {user, coupleId, loading} = useCouple();
//   return (
//     <div>
//       <p>ログイン中: {user?.email || "未ログイン"}</p>
//       <p>ログイン中: {user?.uid || "未ログイン"}</p>
//       <p>{loading?('ロード中'):('ロード済み')}</p>
//       <p>Couple ID: {coupleId }</p>
//     </div>
//   )
// }

// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/config/firebaseConfig"; // Firebase設定ファイルをインポート

// export default async function Test() {
//   try {
//     // Firestoreの`users`コレクションを参照
//     const usersRef = collection(db, "users");

//     // コレクション内の全ドキュメントを取得
//     const querySnapshot = await getDocs(usersRef);

//     // 結果をループしてログに表示
//     querySnapshot.forEach((doc) => {
//       console.log(`Document ID: ${doc.id}`, doc.data());
//     });
//   } catch (error) {
//     console.error("Error fetching documents: ", error);
//   }
//   return(
//     <div>
//         <h1>this is test page</h1>
//     </div>
//   )
// }