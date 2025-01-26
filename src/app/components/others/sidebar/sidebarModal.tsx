// サイドバーに使うモーダル
import { SpinnerWithIcon } from "@/components/loadingSpinner";
import { auth } from "@/config/firebaseConfig";
import { Logout } from "@/utils/Auth/logout";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { IoIosClose } from "react-icons/io";

interface sideModalProps {
  currentUser: User | null | undefined;
  loading: boolean;
  isOpen: boolean;
  onClick: () => void;
}

export const SidebarModal: React.FC<sideModalProps> = ({ currentUser, loading, isOpen, onClick }) => {
  const root = useRouter();
  const photoUrl = currentUser?.photoURL;
  if (!isOpen) {
    return;
  }

  return (
    <div
      className="absolute top-4 left-16 z-10 p-2
                min-w-52 min-h-52
                flex flex-col justify-center text-center 
                bg-white
                rounded-2xl 
                border border-gray-50 shadow-xl"
    >

      {/* 閉じるボタン */}
      <div className="flex justify-end items-center">
        <button onClick={onClick} className="rounded-full bg-pink-200 ">
          <IoIosClose size={30} className="text-white " />
        </button>
      </div>

      {/* アイコンを表示 */}
      <SpinnerWithIcon size={70} loading={loading} icon={photoUrl} />

      {/* ログイン中のユーザー表示 */}
      <h1 className="font-bold m-4">{currentUser?.displayName}</h1>

      {/* ログアウトボタン */}
      <button
        onClick={() => {
          Logout(auth, root);
          root.push("/Auth/Login");
        }}
        className="text-white font-bold bg-pink-200 rounded-xl p-2"
      >
        ログアウト
      </button>
    </div>
  );
};
