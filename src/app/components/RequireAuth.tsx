import { useCouple } from "@/Context/Couple-modified";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, cid } = useCouple();
  const root = useRouter();
  useEffect(() => {
    if (!loading&&(!user || !cid)) {
      if(!user){
        alert("ログインしてください、ログインページに遷移します");
        root.push("/Auth/Login");
      }else{
        alert("カップルを登録してください")
        root.push("/Auth/CoupleRegister")
      }
        
    }
  }, [loading, user, cid, root]);
if (loading) {
    return <div>loaing</div>; // ローディング中のUI
  }
  if (!user || !cid) {
    return <div>Redirecting to login...</div>; // リダイレクト中のUI
  }
  return <div> {children}</div>;
};

