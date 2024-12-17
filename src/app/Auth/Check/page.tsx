"use client"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/config/firebaseConfig";

export default function AuthCheck() {
  const [message,setMessage] = useState("")
  const user = auth.currentUser
  const handleCheckAuth = () =>{
    const currentUser = auth.currentUser
    if(currentUser){
      setMessage(`ログイン中:${currentUser.displayName}`);
      console.log("email:",currentUser.email)
    }else{
      setMessage("ログインしてない")
      console.log(currentUser)
    }
  }
  const handleLogout = () => {
    signOut(auth);
    alert("ログアウトしました！");
  };

  const handleDeleteUser = () => {
    if(user){
      user.delete()
      alert(`${user.email}を削除しました`)
    }else{
      alert("ログインしてません")
    }
  }

  return(
    <div>
      <button onClick={handleCheckAuth}>ログイン状態をチェック</button>
      <p>{message}</p>
      <button onClick={handleLogout}>ログアウト</button>
      <div><button onClick={handleDeleteUser}>アカウントを削除する</button></div>
    </div>
  );
}
