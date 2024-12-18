import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig"; // Firebase設定ファイルをインポート

export default async function fetchAllUsers() {
  try {
    // Firestoreの`users`コレクションを参照
    const usersRef = collection(db, "users");

    // コレクション内の全ドキュメントを取得
    const querySnapshot = await getDocs(usersRef);

    // 結果をループしてログに表示
    querySnapshot.forEach((doc) => {
      console.log(`Document ID: ${doc.id}`, doc.data());
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}
