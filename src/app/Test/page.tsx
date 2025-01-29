"use client";

import AuthHeader from "@/components/AuthHeader";
import { MySubmitButtonWithSpinner } from "@/components/buttons/MySubmitButton";
// import AuthHeader from "@/components/AuthHeader";
import { InputFieldBoldWithDelete } from "@/components/inputs/inputFieldBoldWithDelete";
import { InputFieldBoldWithShow } from "@/components/inputs/inputFieldBoldWithShow";
import { Checklist } from "@/components/login/checklist";
import useAuthStore from "@/Context/authStore";
import useSignStore from "@/Context/signStore";
import { useLogin } from "@/utils/Auth/loginHnandler";
import { loginWithGoogle } from "@/utils/Auth/loginWithGoogle";
import { useValidateForm } from "@/utils/Auth/validateForm";
import { useEditObject } from "@/utils/others/editObject";
import { useEffect, useState } from "react";
import { FaLine, FaInstagram, FaTwitter} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const { inviterId, formObject, setFormObject, isLogin, loading, formError } = useSignStore();
  const initializeAuthListener = useAuthStore((state) => state.initializeAuthListener);
  const validate = useValidateForm();
  const editForm = useEditObject(formObject, setFormObject);
  const [showPass, setShowPass] = useState<string>("password");
  const submitFunction = useLogin();


  useEffect(() => {
    validate();
    // validattionErrorFunc(formError);
    console.log(formError)
  }, [formObject]);

  // authStoreの安定化のための初期化
  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => unsubscribe();
  }, []);

  // パスワードの表示・非表示の切り替え
  const handleToggleShow = () => {
    if (showPass === "text") {
      setShowPass("password");
    } else {
      setShowPass("text");
    }
  };

  return (
    <div className="relative bg-pink-400 h-screen overflow-hidden flex items-center justify-center">
      {/* ヘッダー */}
      <AuthHeader />
      {/* カード表示 */}
      <div className="flex flex-col gap-4 justify-center bg-white  max-h-[75vh] p-10 rounded-3xl max-w-[50vh] w-full overflow-y-scroll">
        <h1 className="font-bold text-center text-xl">{isLogin}</h1>

        {/* 入力フォーム表示 */}
        <form onSubmit={(e) => submitFunction(isLogin, e)} className="flex flex-col gap-4">
          {/* メールアドレス */}
          <InputFieldBoldWithDelete
            placeholder="メールアドレスを入力"
            name="email"
            value={formObject?.email || ""}
            onChange={(e) => editForm(e)}
            onClick={() => setFormObject({ ...formObject!, email: "" })}
          />

          {/* パスワード */}
          <InputFieldBoldWithShow
            type={showPass}
            placeholder="パスワードを入力"
            name="password"
            value={formObject?.password || ""}
            onChange={(e) => editForm(e)}
            onClick={() => handleToggleShow()}
          />

          {/* パスワード確認 */}
          {isLogin === "signup" && (
            <InputFieldBoldWithShow
              type={showPass}
              placeholder="パスワードを再入力"
              name="confirmPassword"
              value={formObject?.confirmPassword || ""}
              onChange={(e) => editForm(e)}
              onClick={() => handleToggleShow()}
            />
          )}

          {/* サインアップ時のエラー表示 */}
          {isLogin === "signup" && <Checklist />}

          {/* 登録用ボタン */}
          <MySubmitButtonWithSpinner
            text={isLogin === "login" ? "ログイン" : "登録"}
            disabled={formError.passwordError||formError.emailError||formError.confirmError || loading}
            loading={loading}
            color="border-white"
          />

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
  );
};

export default LoginPage;
