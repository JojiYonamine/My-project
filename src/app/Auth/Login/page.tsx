"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { Suspense, useEffect, useState } from "react";
import { FaLine, FaInstagram, FaTwitter } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiShow } from "react-icons/bi";

import { FcGoogle } from "react-icons/fc";
import { BasicButton } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { loginWithGoogle } from "@/utils/Auth/loginWithGoogle";
import AuthHeader from "@/components/AuthHeader";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<string>(password);
  const [emailError, setEmaileError] = useState<boolean>(true);
  const [passError, setPassError] = useState<boolean>(true);
  const [link, setLink] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const root = useRouter();
  const searchParams = useSearchParams();
  const inviterId = searchParams.get("inviterId");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("ログイン成功！");
      console.log("ログイン成功")
      setLoading(false);
      root.push("/Calendar");
    } catch (err: unknown) {
      alert(err);
      setLoading(false);
    }
  };

  const hanldeToggleShow = () => {
    if (showPass === "text") {
      setShowPass("password");
    } else {
      setShowPass("text");
    }
  };

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
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setEmaileError(true);
    } else {
      setEmaileError(false);
    }
  };

  useEffect(() => {
    validation();
  }, [password, email]);

  useEffect(() => {
    if (inviterId) {
      setLink(`/Auth/Signup?inviterId=${inviterId}`);
    } else {
      setLink("/Auth/Signup");
    }
  }, []);

  return (
    <div className="bg-pink-400 h-screen overflow-hidden">
      <AuthHeader page={link} />
      <main className="bg-pink-400 flex justify-center mt-10 mx-6 text-center max-h-[80vh] items-center">
        {/* カード表示 */}
        <div className="flex justify-center bg-white rounded-3xl w-full py-8 max-w-sm max-h-[70vh]  drop-shadow-md">
          <div className="overflow-hidden w-full p-8 mb-12">
            <h1 className="text-xl w-full mb-8 font-bold">Login</h1>
            <form onSubmit={handleLogin}>
              {/* メール入力 */}
              <div className="relative mb-4 w-full">
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
              <div className="relative mb-8">
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

              <BasicButton disabled={emailError || passError || loading}>
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
                  "ログイン"
                )}
              </BasicButton>
            </form>

            {/* メールとソーシャルを区切る線 */}
            <div className="flex items-center">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="m-4 text-gray-500">または</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* ソーシャルログイン */}
            <div className="space-x-8 flex mb-8 justify-center text-center items-center">
              <button
                onClick={() => {
                  loginWithGoogle(inviterId);
                }}
              >
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
    </div>
  );
}

export default function AuthLogin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}