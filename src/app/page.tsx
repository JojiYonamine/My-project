//注意事項！！！！！！！
//ディレクトリの位置を示すパスと、Route,Linkで指定するパスは別物！！！！
//Routeはレンダリングされない、Linkを使ってあげる
//Next.js13以降らしい、Viteとは全く違う感じがするので注意していこう

"use client"
import Link from "next/link"
import { auth } from "@/config/firebaseConfig";

const home =()=>{
  console.log(auth.currentUser);
  return(
    <div>
      <h1>This is home</h1>
      <div>
        <Link href='./Auth/Signup'>signup</Link>
      </div>
      <div>
        <Link href='./Auth/Login'>login</Link>
      </div>
      <div>
        <Link href='./Auth/Check'>check the state / logout</Link>
      </div>
    </div>
  )
};

export default home;