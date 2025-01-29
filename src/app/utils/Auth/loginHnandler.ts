// ログイン・サインインを行う関数を返すカスタムフック
import { auth } from "@/config/firebaseConfig";
import useSignStore from "@/Context/signStore";
import { sendVerification } from "@/types/sendEmailVerification";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const formObject = useSignStore((state) => state.formObject);
  const formError = useSignStore((state) => state.formError);
  const setLoading = useSignStore((state) => state.setLoading);
  const inviterId = useSignStore((state)=>state.inviterId)
  const root = useRouter()

  const loginHandler = async (action: "login" | "signup",e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formObject) {
      return;
    }
    if (formError.confirmError || formError.emailError  || formError.passwordError) {
      return;
    }
    setLoading(true);
    try {
      if (action === "login") {
        await signInWithEmailAndPassword(auth, formObject.email, formObject.password);
        root.push("/Calendar");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formObject.email, formObject.password);
        await sendVerification(userCredential.user);
        if (inviterId) {
            root.push(`/Auth/setProfile?inviterId=${inviterId}`);
          } else {
            root.push("/Auth/setProfile");
          }
      }
    } catch (err) {
      console.log(err, "login handlerでエラー");
    }
    setLoading(false);
  };
  return loginHandler
};
