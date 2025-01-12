import useAuthStore from "@/Context/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "./loadingSpinner";

// これを使っても、子コンポーネント内のuseEffectと、useAuthStoreは読み込まれるので注意

interface RequireAuthProps {
  children: React.ReactNode;
  requireCouple?: boolean;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
  requireCouple = true,
}) => {
  const { loading, currentUser, currentCid} = useAuthStore();
  const root = useRouter();
  console.log("loading:", loading);
  console.log("currentUser:", currentUser);
  console.log("cid:", currentCid);


  // 条件を満たさないユーザーをログイン画面に送る
  useEffect(() => {
    if(loading){
      return
    }
    if (!currentUser) {
      alert("この機能を使うにはログインが必要です");
      root.push("/Auth/Login");
      return;
    }
    if (!currentCid && requireCouple) {
      alert("この機能を使うにはカップルの登録が必要です");
      root.push("/Auth/Login");
      return;
    }
  }, [loading]);

  // 初期化できていないときはスピナーを表示
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={70} />
      </div>
    );
  }

  // 未ログイン時に少し表示されるの防止
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={70} />
      </div>
    );
  }
  // カップル登録なしの時に少し表示されるの防止
  if (requireCouple && !currentCid) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={70} />
      </div>
    );
  } else {
    console.log("return children");
    return <>{children}</>;
  }
};