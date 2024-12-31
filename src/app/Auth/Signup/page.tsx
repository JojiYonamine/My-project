"use client";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { BasicButton } from "@/components";
import { AiOutlineClose } from "react-icons/ai"; // React Iconsを使用
import { BiShow } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
export default function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [emailError, setEmaileError] = useState<boolean>(true);
  const [passError, setPassError] = useState<boolean>(true);
  const [confirmError, setConfirmError] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<string>("text");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // メールアドレス・パスワードチェック
  const validation = (): void | boolean => {
    if (!emailRegex.test(email)) {
      setEmaileError(true);
      console.log("error,email");
    } else {
      setEmaileError(false);
    }
    if (password.length < 6) {
      setPassError(true);
    } else {
      setPassError(false);
    }
    if (password === confirm && password.length !== 0) {
      setConfirmError(false);
    } else {
      setConfirmError(true);
    }
    if (emailError && passError && confirmError) {
      return true;
    } else {
      return false;
    }
  };

  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setEmaileError(true);
    } else {
      setEmaileError(false);
      console.log("ok");
    }
  };

  // const validatePassword = () => {
  //   if (password.length < 6) {
  //     setPassError(true);
  //     console.log("pass");
  //   } else {
  //     setPassError(false);
  //   }
  // };

  // const validateConfirm = () => {
  //   if (password !== confirm) {
  //     setConfirmError(true);
  //     console.log("conf");
  //   } else {
  //     setConfirmError(false);
  //   }
  // };

  const hanldeToggleShow = () => {
    if (showPass === "text") {
      setShowPass("password");
    } else {
      setShowPass("text");
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validation()) return;
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      setLoading(false);
    } catch (err: unknown) {
      alert(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    validation();
  }, [password, email, confirm]);

  return (
    <div className="bg-pink-100 h-screen flex justify-center text-center items-center">
      <div className="bg-white rounded-3xl px-32 py-10  max-w-xl">
        <h1 className="text-xl mb-5 w-full mb-8">新規登録</h1>
        <form onSubmit={handleSignUp}>
          {/* メール入力 */}
          <div className="relative mb-8 w-full">
            <input
              placeholder="sample@email.com"
              value={email}
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none "
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              onBlur={validateEmail}
            />
            <button
              type="button"
              onClick={() => setEmail("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black h-2 w-2 flex items-center justify-center bg-gray-400 rounded-full"
            >
              <AiOutlineClose size={6} className="text-white" />
            </button>
          </div>

          {/* パスワード入力 */}
          <div className="relative mb-2">
            <input
              type={showPass}
              value={password}
              placeholder="新しいパスワード"
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none "
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => hanldeToggleShow()}
              className="h-3 w-3 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black flex items-center justify-center bg-gray-200 rounded-full"
            >
              <BiShow />
            </button>
          </div>

          {/* パスワード確認 */}
          <div className="relative mb-4">
            <input
              type={showPass}
              placeholder="パスワード再入力"
              value={confirm}
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none "
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setConfirm(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => hanldeToggleShow()}
              className="h-3 w-3 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black flex items-center justify-center bg-gray-200 rounded-full"
            >
              <BiShow />
            </button>
          </div>

          {/* チェックリスト */}
          <div className='ml-4 mb-8'>
            <div className="flex mb-2 font-bold">
              {emailError ? (
                <FaRegCheckCircle className="h-4 w-4 text-gray-300" />
              ) : (
                <FaRegCheckCircle className="h-4 w-4 text-pink-500" />
              )}
              <label className="text-xs ml-2 text-gray-700">
                メールアドレス
              </label>
            </div>

            <div className="flex mb-2 font-bold">
              {passError ? (
                <FaRegCheckCircle className="h-4 w-4 text-gray-300" />
              ) : (
                <FaRegCheckCircle className="h-4 w-4 text-pink-500" />
              )}
              <label className="text-xs ml-2 text-gray-700">
                ６文字以上のパスワード
              </label>
            </div>

            <div className="flex mb-2 font-bold">
              {confirmError ? (
                <FaRegCheckCircle className="h-4 w-4 text-gray-300" />
              ) : (
                <FaRegCheckCircle className="h-4 w-4 text-pink-500" />
              )}
              <label className="text-xs ml-2 text-gray-700">再確認と一致</label>
            </div>
          </div>

          <BasicButton disabled={emailError || passError || confirmError}>
            登録
          </BasicButton>
        </form>
      </div>
    </div>
  );
}
