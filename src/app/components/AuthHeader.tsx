import useSignStore from "@/Context/signStore";
import { formObjectType } from "@/types/formtypes";
import Image from "next/image";
import React from "react";

const AuthHeader: React.FC = () => {
  const isLogin = useSignStore((state) => state.isLogin);
  const setIsLogin = useSignStore((state) => state.setIsLogin);
  const setForm = useSignStore((state)=>state.setFormObject)

  const changeIsLogin = () => {
    const newState = isLogin == "login" ? "signup" : "login";
    const newForm:formObjectType = {
      email: "",
      password: "",
      confirmPassword: isLogin==="login"? "":null
    }
    setIsLogin(newState);
    setForm(newForm)

  };

  // ログイン状態を反転させる
  const text = isLogin !== "login" ? "Login" : "Signup";
  return (
    <header className="absolute top-0 bg-pink-400 flex justify-between items-center w-full p-2">
      {/* ロゴ用 */}
      <div className="flex items-center">
        <Image src="/logo1.png" alt="Logo" width={40} height={40} />
        <span className="text-xl font-semibold text-white">MyApp</span>
      </div>

      <button onClick={()=>changeIsLogin()} className="flex bg-pink-300 text-white font-bold px-4 py-2 rounded-3xl">{text}</button>
    </header>
  );
};

export default AuthHeader;
