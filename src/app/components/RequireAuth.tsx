import useAuthStore from "@/Context/authStore";
import { useCouple } from "@/Context/Couple-modified";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "./loadingSpinner";

interface RequireAuthProps {
  children: React.ReactNode;
  requireCouple?: boolean;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
  requireCouple = true,
}) => {
  const { userDoc, loading, currentUser } = useAuthStore();
  const cid = userDoc?.data()?.cid;
  const root = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      alert("この機能を使うにはログインが必要です");
      root.push("/Auth/Login");
      return;
    }
    if (!loading && !cid && requireCouple) {
      alert("この機能を使うにはカップルの登録が必要です");
      root.push("/Auth/Login");
      return;
    }
  }, [currentUser, loading]);

  // ロード中・ロード後にログインしていない場合のスピナー
  if (loading || !currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={70} />
      </div>
    );
  }
  // カップル登録が必要な機能において、ロードにカップル登録していない場合のスピナー
  if (requireCouple && !loading && !cid) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={70} />
      </div>
    );
  } else {
    return <>{children}</>;
  }
};
//   useEffect(() => {
//     if (!loading&&(!user || !cid)) {
//       if(!user){
//         alert("ログインしてください、ログインページに遷移します");
//         root.push("/Auth/Login");
//       }else{
//         alert("カップルを登録してください")
//         root.push("/Auth/CoupleRegister")
//       }

//     }
//   }, [loading, user, cid, root]);
// if (loading) {
//     return <div>loaing</div>; // ローディング中のUI
//   }
//   if (!user || !cid) {
//     return <div>Redirecting to login...</div>; // リダイレクト中のUI
//   }
// return <div> {children}</div>;
