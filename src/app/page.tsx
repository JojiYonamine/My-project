//注意事項！！！！！！！
//ディレクトリの位置を示すパスと、Route,Linkで指定するパスは別物！！！！
//Routeはレンダリングされない、Linkを使ってあげる
//Next.js13以降らしい、Viteとは全く違う感じがするので注意していこう

"use client"
import { auth } from "@/config/firebaseConfig";

const home =()=>{
  console.log(auth.currentUser);
  return(
    <div>
      <h1>ようこそ</h1>
    </div>
  )
};

export default home;