"use client";

import { BasicButton } from "@/components";
import { userRef } from "@/utils/others/firestoreRefs";
import { getDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const InvitePage = () => {
  const searhParams = useSearchParams();
  const root = useRouter();
  const inviterId = searhParams.get("inviterId");
  const [inviterName, setInviterName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getInviterName = async (inviterId: string) => {
    if (inviterId) {
      const inviter = await getDoc(userRef(inviterId));
      if (inviter.exists()) {
        return inviter.data().name;
      } else {
        return "エラー";
      }
    }
  };

  useEffect(() => {
    const fetchInviterName = async () => {
      try {
        if (inviterId) {
          const name = await getInviterName(inviterId);
          setInviterName(name);
        }
      } catch (err: unknown) {
        console.error(err);
        setError("招待者情報の取得に失敗しました");
      }
    };
    fetchInviterName();
  }, [inviterId]);
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="h-screen flex justify-center text-center items-center">
      <div className="bg-white rounded p-6 w-11/12 sm:mt-0  max-w-lg border border-gray-300">
        <h1 className="text-xl w-full mb-8 font-semibold break-words">
          ようこそ！
        </h1>
        <h1 className="text-xl w-full mb-8 font-semibold break-words">
          {inviterName
            ? `${inviterName}さんからの招待です！`
            : "招待者情報を取得中。。。"}
        </h1>
        <BasicButton onClick={()=>root.push(`/Auth/Login?inviterId=${inviterId}`)}>登録へ進む</BasicButton>
      </div>
    </div>
  );
};

export default InvitePage;
