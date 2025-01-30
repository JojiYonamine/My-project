import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const handleLogin = async (e: React.FormEvent,email:string,password:string) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("ログイン成功！");
    console.log("ログイン成功");
  } catch (err: unknown) {
    alert(err);
  }
};
