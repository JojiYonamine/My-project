"use client"

import { auth } from "@/config/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { db } from "@/config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";



const Setting =()=>{
  const [username,setUsername] = useState("")
  const [error, setError] = useState("");
  const user = auth.currentUser;
  const router = useRouter();

  const registerCurrentUser = async () => {
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName || "Anonymous",
        email: user.email,
        cid: null,
        createdAt: new Date(),
      });
      console.log("User registered in Firestore!");
    }
  };

  const registar = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      if(user){
        await updateProfile(user,  { displayName: username })
        registerCurrentUser()
        alert("登録完了！")
        router.push('/')
      }else{
        setError("ユーザーがログインしていません");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("不明なエラーが発生しました");
      }
    }
    console.log(user)
  }

  return(
    <div>
      <form onSubmit={registar}>
        <input 
          type="text"
          placeholder="ユーザーネーム"
          value={username}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}}
        />  
        <button type = "submit"> 登録 </button>
      </form>      
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
};

export default Setting;

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("登録が完了しました！");
//       router.push('/Auth/Signup/Setting')
//     } catch (err: any) {
//       setError(err.message || "エラーが発生しました");
//     }
//   };

//   return (
//     <div>
//       <h1>サインアップ</h1>
//       <form onSubmit={handleSignup}>
//         <input
//           type="email"
//           placeholder="メールアドレス"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="パスワード"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">登録</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
    
//   );
// }
