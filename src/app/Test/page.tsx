"use client";

import { QRCodeCanvas } from "qrcode.react";

const LoginPage = () => {



  return (
    <div className="relative bg-pink-400 h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold mb-2">QRコードで招待</h2>
        <QRCodeCanvas value={`https://my-project-yftg.vercel.app/Auth/Invite?inviterId=`} size={200} />
        <p className="mt-2 text-sm text-gray-500">スキャンして招待リンクにアクセス</p>
      </div>
    </div>
  );
};

export default LoginPage;
