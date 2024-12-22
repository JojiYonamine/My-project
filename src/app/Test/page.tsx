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