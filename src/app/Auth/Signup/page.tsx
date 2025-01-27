"use client";
import { Suspense, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { BasicButton } from "@/components";
import { AiOutlineClose } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import {
  FaLine,
  FaInstagram,
  FaTwitter,
  FaRegCheckCircle,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";
import { loginWithGoogle } from "@/utils/Auth/loginWithGoogle";
import AuthHeader from "@/components/AuthHeader";

const SignupPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [emailError, setEmaileError] = useState<boolean>(true);
  const [passError, setPassError] = useState<boolean>(true);
  const [confirmError, setConfirmError] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<string>("text");
  const [link, setLink] = useState<string>("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 招待用
  const root = useRouter();
  const searchParams = useSearchParams();
  const inviterId = searchParams.get("inviterId");

  // メールアドレス・パスワードチェック
  const validation = (): void | boolean => {
    if (!emailRegex.test(email)) {
      setEmaileError(true);
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
    }
  };

  const hanldeToggleShow = () => {
    if (showPass === "text") {
      setShowPass("password");
    } else {
      setShowPass("text");
    }
  };

  const sendVerification = async (user: User) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_AUTH_URL;
      const actionCodeSettings = {
        url: `${baseUrl}`,
        handleCodeInApp: true,
      };
      await sendEmailVerification(user, actionCodeSettings);
    } catch (err: unknown) {
      alert(err);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendVerification(userCredential.user);
      if (inviterId) {
        root.push(`/Auth/setProfile?inviterId=${inviterId}`);
      } else {
        root.push("/Auth/setProfile");
      }
      setLoading(false);
    } catch (err: unknown) {
      alert(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    validation();
  }, [password, email, confirm]);

  useEffect(() => {
    if (inviterId) {
      setLink(`/Auth/Login?inviterId=${inviterId}`);
    } else {
      setLink("/Auth/Login");
    }
  }, []);

  return (
    // ページ表示
    <div className="bg-pink-400 h-screen overflow-hidden">
      {/* ヘッダー */}
      <AuthHeader page={link} />

      {/* カード部分 */}
      <main className="h-full bg-pink-400 flex justify-center mx-6 text-center max-h-[80vh] items-center">
        {/* カード表示 */}
        <div className="flex justify-center bg-white rounded-3xl w-full py-8 max-w-sm max-h-[70vh]  drop-shadow-md">
          <div className="overflow-y-auto w-full p-8">
            <h1 className="text-xl w-full mb-8 font-bold">Sign up</h1>
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
                  placeholder="Password"
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
                  placeholder="confirm password"
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
              <div className="ml-6 mb-8">
                {emailError ? (
                  <div className="flex mb-2 font-bold">
                    <FaRegCheckCircle className="h-4 w-4 text-gray-300" />
                    <label className="text-xs ml-2 text-gray-400">
                      メールアドレス
                    </label>
                  </div>
                ) : (
                  <div className="flex mb-2 font-bold">
                    <FaRegCheckCircle className="h-4 w-4 text-pink-500" />
                    <label className="text-xs ml-2 text-gray-700">
                      メールアドレス
                    </label>
                  </div>
                )}

                {/* パスワードチェックボックス */}
                {passError ? (
                  <div className="flex mb-2 font-bold">
                    <FaRegCheckCircle className="h-4 w-4 text-gray-300" />
                    <label className="text-xs ml-2 text-gray-400">
                      ６文字以上のパスワード
                    </label>
                  </div>
                ) : (
                  <div className="flex mb-2 font-bold">
                    <FaRegCheckCircle className="h-4 w-4 text-pink-500" />
                    <label className="text-xs ml-2 text-gray-700">
                      ６文字以上のパスワード
                    </label>
                  </div>
                )}

                {/* 再確認チェックボックス */}
                {confirmError ? (
                  <div className="flex mb-2 font-bold">
                    <FaRegCheckCircle className="h-4 w-4 text-gray-300" />
                    <label className="text-xs ml-2 text-gray-400">
                      再確認と一致
                    </label>
                  </div>
                ) : (
                  <div className="flex mb-2 font-bold">
                    <FaRegCheckCircle className="h-4 w-4 text-pink-500" />
                    <label className="text-xs ml-2 text-gray-700">
                      再確認と一致
                    </label>
                  </div>
                )}
              </div>
              <BasicButton
                disabled={emailError || passError || confirmError || loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-8 w-8 text-white "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  "登録"
                )}
              </BasicButton>
            </form>

            {/* メールとソーシャルを区切る線 */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="m-4 text-gray-500">または</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* ソーシャルログイン */}
            <div className="space-x-8 flex mb-8 justify-center text-center items-center">
              <button onClick={() => loginWithGoogle(inviterId)}>
                <FcGoogle size={48} />
              </button>
              <button className="bg-blue-500 p-2 rounded-full">
                <FaTwitter size={32} className="text-white" />
              </button>
              <button>
                <FaLine size={48} className="text-green-500" />
              </button>
              <button>
                <FaInstagram size={48} className="text-fuchsia-400" />
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* <footer><h1>じょうじ</h1></footer> */}
    </div>
  );
}

export default function AuthSignup() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPage />
    </Suspense>
  );
}