import useSignStore from "@/Context/signStore";
import { validateFormType } from "@/types/formtypes";

type useValidateFormType = () => void;

export const useValidateForm = (): useValidateFormType => {
  const formObject = useSignStore((state) => state.formObject);
  const setFormError = useSignStore((state) => state.setFormError);
  const isLogin = useSignStore((state) => state.isLogin);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (): void => {
    if (!formObject) return;
    const email = formObject.email;
    const password = formObject.password;
    const confirm = formObject.confirmPassword;

    // 各種エラー要素 エラーがある際にtrueを返す

    const emailError = !emailRegex.test(email)?true:false;
    const passError = password.length < 6?true:false;
    const confirmError = password === confirm && password.length !== 0 ? false:true

    const formError: validateFormType = {
      emailError: emailError,
      passwordError: passError,
      confirmError: isLogin === "signup" ? confirmError : false, //
    };
    setFormError(formError);
  };
  return validate;
};
