import { useCouple } from "@/Context/Couple-modified";
import Image from "next/image";
import Link from "next/link";
import { BsChatHeart, BsCalendarHeart } from "react-icons/bs";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GiSpikedDragonHead } from "react-icons/gi";
import useAuthStore from "@/Context/authStore";
import { User } from "firebase/auth";

const Sidebar = () => {
    const currentUser = useAuthStore((state)=>state.currentUser)
    const loading = useAuthStore((state)=>state.loading)
  return (
    <div className="h-screen w-64 flex bg-pink-50 flex-col">
      {/* ユーザー情報 */}
      <div className="flex items-center justify-center w-full">
        <Image src="/logo1.png" alt="Logo" width={80} height={80} />
      </div>

      {/* ナビゲーション */}
      <nav className="grid grid-rows-1 gap-1 w-full">
        <Link
          className="pl-4 flex items-center max-w-64 hover:bg-gray-200 rounded-lg"
          href="/Chat"
        >
          <BsChatHeart size={20} />
          <span className="ml-2 text-lg">CHAT</span>
        </Link>
        <Link
          className="pl-4 flex items-center max-w-64 hover:bg-gray-200 rounded-lg"
          href="/Calendar"
        >
          <BsCalendarHeart size={20} />
          <span className="ml-2 text-lg">CALENDAR</span>
        </Link>
        <Link
          className="pl-4 flex items-center max-w-64 hover:bg-gray-200 rounded-lg"
          href="/Task"
        >
          <MdOutlineTaskAlt size={20} />
          <span className="ml-2 text-lg">TASK</span>
        </Link>
        <Link
          className="pl-4 flex items-center max-w-64 hover:bg-gray-200 rounded-lg"
          href="/Test"
        >
          <GiSpikedDragonHead size={20} />
          <span className="ml-2 text-lg">TEST</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
