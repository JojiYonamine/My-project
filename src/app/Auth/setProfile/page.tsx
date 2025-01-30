// 初回登録者がユーザー情報を入力するページ

"use client";
import { BirthDay } from "@/components/login/progress-birthday";
import { Complete } from "@/components/login/progress-complete";
import { Icon } from "@/components/login/progress-icon";
import { Name } from "@/components/login/progress-name";
import { RequireAuth } from "@/components/RequireAuth";
import useAuthStore from "@/Context/authStore";
import useSignStore from "@/Context/signStore";
import { useUploadProfile } from "@/utils/Auth/profileUpdater";
import { useRegisterCouple } from "@/utils/Auth/registerCouple";
import { getUserNameFromFirestore } from "@/utils/others/firestoreRefs";
import { useEffect, useState } from "react";

const SetProfile = () => {
  const progress = useSignStore((state) => state.progress) as keyof typeof stepComponents;
  const [inviterName, setInviterName] = useState<string>("");
  const user = useAuthStore((state) => state.currentUser);
  const loading = useAuthStore((state) => state.loading);
  const { inviterId, setInviteLink } = useSignStore();
  const registerCouple = useRegisterCouple();
  const handleUpadateProfile = useUploadProfile();
  //   招待用リンクの作成
  const generateInviteLink = (uid: string | undefined) => {
    // const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_INVITE_URL;
    // return `${baseUrl}?inviterId=${encodeURIComponent(uid)}`;
    if (!uid) return "エラー";
    return `https://my-project-yftg.vercel.app/Auth/Invite?inviterId=${encodeURIComponent(uid)}`;
  };

  const getUserName = async () => {
    if (!user || !inviterId) {
      return;
    }
    const InviterName: string = await getUserNameFromFirestore(inviterId);
    setInviterName(InviterName);
  };

  const stepComponents = {
    name: <Name />,
    icon: <Icon />,
    birthDay: <BirthDay />,
    complete: <Complete inviterName={inviterName} />,
  };

  // レンダリングと同時にカップル登録をする
  useEffect(() => {
    if (loading || !user) {
      console.log("no user or now loading");
      return;
    } else {
      if (!inviterId) return;
      registerCouple(inviterId, user.uid);
    }
  }, []);

  useEffect(() => {
    if (loading || !user) return;
    // 招待されていない時、リンクを生成
    if (!inviterId) {
      setInviteLink(generateInviteLink(user.uid));
      // 招待されている時相手の名前を取得
    } else {
      getUserName();
    }
  }, []);

  return (
    // ページ表示
    <div className="h-screen flex justify-center text-center items-center">
      {/* カード表示 */}
      <h1>{progress}</h1>
      <div className="bg-white rounded p-6 w-11/12 sm:mt-0  max-w-lg border border-gray-300">
        <form
        onSubmit={(e)=>handleUpadateProfile(e)}
        >
          {/* 入力フォームの表示 */}
          {stepComponents[progress] || null}
        </form>
      </div>
    </div>
  );
};

export default function AuthSetProfile() {
  return (
    <RequireAuth requireCouple={false}>
      <SetProfile />
    </RequireAuth>
  );
}
