"use client"

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import Link from "next/link";

export default function AuthCheck() {
  const user = auth.currentUser

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
  <div>
    {user ? "ログイン中" : "未ログイン"}
    <div><Link href = '/'>go back to home</Link> </div>
  </div>
);
}


// export default function AuthCheck() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//   <div>
//     {user ? "ログイン中" : "未ログイン"}
//     <div><Link href = '/'>go back to home</Link> </div>
//   </div>
// );
// }

