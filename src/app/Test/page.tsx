"use client"

import { useCouple } from "@/Context/CoupleContext"
export default function Test () {
  const {user, loading} = useCouple();
  return (
    <div>
      <p>ログイン中: {user?.email || "未ログイン"}</p>
      <p>{loading?('ロード中'):('ロード済み')}</p>
    </div>
  )
}

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