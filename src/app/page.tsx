//注意事項！！！！！！！
//ディレクトリの位置を示すパスと、Route,Linkで指定するパスは別物！！！！
//Routeはレンダリングされない、Linkを使ってあげる
//Next.js13以降らしい、Viteとは全く違う感じがするので注意していこう

"use client";

import { RequireAuth } from "./components/RequireAuth";
import Sidebar from "./components/Sidebar";

const home = () => {
  return (
    <div>
      <RequireAuth>
        <Sidebar />
        <h1>ようこそ</h1>
      </RequireAuth>
    </div>
  );
};

export default home;
