import useAuthStore from "@/Context/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "./loadingSpinner";

// これを使っても、子コンポーネント内のuseEffectと、useAuthStoreは読み込まれるので注意

interface RequireAuthProps {
  children: React.ReactNode;
  requireCouple?: boolean;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, requireCouple = true }) => {
  const { loading, currentUser, initializeAuthListener, currentCid } = useAuthStore();
  const root = useRouter();


  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => {
      unsubscribe();
    };
  }, [initializeAuthListener]);

  // 条件を満たさないユーザーをログイン画面に送る
  useEffect(() => {
    console.log("useEffect on require auth");
    if (loading) {
      // console.log("loading中: 初期化待機");
      return;
    }
    if (!currentUser && !loading) {
      alert("この機能を使うにはログインが必要です");
      root.push("/Auth/Login");
      return;
    }
    if (!currentCid && requireCouple && !loading) {
      alert("この機能を使うにはカップルの登録が必要です");
      root.push("/Auth/Login");
      return;
    }
  }, [loading, currentCid,currentUser]);

  // 初期化できていないときはスピナーを表示
  if (loading || !currentUser || !currentCid) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={70} />
      </div>
    );
  } else {
    return <>{children}</>;
  }
};
