"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("登録が完了しました！");
      router.push('/Auth/SettingIndividual')
    } catch (err: unknown) {
      if(err instanceof Error){
        setError(err.message)
      }else{
        setError("不明なエラーが発生しました")
      }
    }
  };

  return (
    <div>
      <h1>サインアップ</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">登録</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    
  );
}
