// プロフィール入力時に、呼び出す関数

import useAuthStore from "@/Context/authStore";
import useSignStore from "@/Context/signStore";
import { updateProfile, User } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { userRef } from "../others/firestoreRefs";


export const useUploadProfile = () => {
  const user = useAuthStore((state) => state.currentUser);
  const profile = useSignStore((state)=>state.profile);
  const root = useRouter();
  const setLoading = useSignStore((state)=>state.setLoading)
  const setProgress = useSignStore((state)=>state.setProgress)



//   firestoreへの登録
  const registerUserProfile = async (user: User, birthDay: Date) => {
    try {
      await setDoc(
        userRef(user.uid),
        {
          name: profile?.name,
          email: user.email,
          birthDay: birthDay,
          createdAt: new Date(),
        },
        { merge: true }
      );
      console.log("registered in firestore")
    } catch (err: unknown) {
      alert(err);
    }
  };

//   呼び出す関数
  const handleUpadateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (!user || !profile) {
      alert("エラーが発生しました");
      root.push("/Auth/Signup");
      return;
    }
    try {
      await updateProfile(user, { displayName: profile?.name, photoURL: profile?.icon });
      console.log("registered in fireauth")

      await registerUserProfile(user, profile.birthday);

    } catch (err: unknown) {
      alert(err);
    }
    setLoading(false)
    setProgress("complete")
  };

  return handleUpadateProfile
};
