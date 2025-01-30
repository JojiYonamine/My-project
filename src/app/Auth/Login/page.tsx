"use client";
import AuthHeader from "@/components/AuthHeader";
import { MySubmitButtonWithSpinner } from "@/components/buttons/MySubmitButton";
import { InputFieldBoldWithDelete } from "@/components/inputs/inputFieldBoldWithDelete";
import { InputFieldBoldWithShow } from "@/components/inputs/inputFieldBoldWithShow";
import { Checklist } from "@/components/login/checklist";
import { SocialLoginList } from "@/components/login/socialLoginList";
import useAuthStore from "@/Context/authStore";
import useSignStore from "@/Context/signStore";
import { useLogin } from "@/utils/Auth/loginHnandler";
import { useValidateForm } from "@/utils/Auth/validateForm";
import { useEditObject } from "@/utils/others/editObject";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const { formObject, setFormObject, isLogin, loading, formError } = useSignStore();
  const initializeAuthListener = useAuthStore((state) => state.initializeAuthListener);
  const validate = useValidateForm();
  const editForm = useEditObject(formObject, setFormObject);
  const [showPass, setShowPass] = useState<string>("password");
  const submitFunction = useLogin();

  // 入力時にバリデーションを行う
  useEffect(() => {
    validate();
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
      <div className="flex flex-col gap-5 justify-center bg-white  max-h-[80vh] p-10 rounded-3xl max-w-[50vh] w-full overflow-y-scroll m-1">
        <h1 className="mt-4 font-bold text-center text-xl">{isLogin}</h1>
        {/* 入力フォーム表示 */}
        <form onSubmit={(e) => submitFunction(isLogin, e)} className="flex flex-col gap-8" >
          {/* メールアドレス */}
          <InputFieldBoldWithDelete
            placeholder="メールアドレスを入力"
            name="email"
            value={formObject?.email || ""}
            onChange={(e) => editForm(e)}
            onClick={() => setFormObject({ ...formObject!, email: "" })}
          />

          {/* パスワード・再確認 */}
          <div className="flex flex-col gap-1">
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
          </div>
          {/* サインアップ時のエラー表示 */}
          {isLogin === "signup" && <Checklist />}

          {/* 登録用ボタン */}
          <MySubmitButtonWithSpinner
            text={isLogin === "login" ? "ログイン" : "登録"}
            disabled={formError.passwordError || formError.emailError || formError.confirmError || loading}
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
        <SocialLoginList />
      </div>
    </div>
  );
};

export default LoginPage;
