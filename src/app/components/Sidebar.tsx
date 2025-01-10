import { useCouple } from "@/Context/Couple-modified";
import Image from "next/image";
import Link from "next/link";
import { BsChatHeart, BsCalendarHeart } from "react-icons/bs";
import { MdOutlineTaskAlt } from "react-icons/md";
import { LuPanelLeft } from "react-icons/lu";
import { GiSpikedDragonHead } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";

import useAuthStore from "@/Context/authStore";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import ShowIcon from "./showIcon";
import { SpinnerWithIcon } from "./loadingSpinner";

const Sidebar = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const userDoc = useAuthStore((state) => state.userDoc);
  const photoUrl = currentUser?.photoURL;
  const userName = currentUser?.displayName;
  const partnerId = userDoc?.data()?.partnerId;
  const loading = useAuthStore((state) => state.loading);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {isOpen ? (
        <div className="h-screen w-64 flex bg-pink-50 flex-col">
          {/* ユーザー情報 */}
          <div className="flex items-center justify-between w-full m-4 ">
            <button onClick={() => handleToggleSidebar()} className="">
              <LuPanelLeft size={30} />
            </button>
            <div className="px-2">
              <IoIosNotifications size={40} />
            </div>
          </div>

          <div className="flex  items-center justify-between w-full mb-4 ">
            <div className="px-2">
              <SpinnerWithIcon size={40} loading={loading} icon={photoUrl} />
            </div>
            {/* {userName ? (
              <h1 className="overflow=hidden">ようこそ{userName}さん</h1>
            ) : (
              <h1>。。。。</h1>
            )} */}
          </div>

          {/* ナビゲーション */}
          <nav className="grid grid-rows-1 gap-1 w-full overflow-hidden">
            <Link
              className="pl-4 py-2 flex items-center max-w-64 hover:bg-gray-200 rounded-lg"
              href="/Chat"
            >
              <BsChatHeart size={30} />
              <span className="ml-2 text-lg">CHAT</span>
            </Link>
            <Link
              className="pl-4 py-2 flex items-center max-w-64 hover:bg-gray-200 rounded-lg"
              href="/Calendar"
            >
              <BsCalendarHeart size={30} />
              <span className="ml-2 text-lg">CALENDAR</span>
            </Link>
            <Link
              className="pl-4 py-2 flex items-center max-w-64 hover:bg-gray-200 rounded-lg"
              href="/Task"
            >
              <MdOutlineTaskAlt size={30} />
              <span className="ml-2 text-lg">TASK</span>
            </Link>
            <Link
              className="pl-4 py-2 flex items-center max-w-64 hover:bg-gray-200 rounded-lg"
              href="/Test"
            >
              <GiSpikedDragonHead size={30} />
              <span className="ml-2 text-lg">TEST</span>
            </Link>
          </nav>
        </div>
      ) : (
        <div className="h-screen w-16 flex bg-pink-50 flex-col">
          <button onClick={() => handleToggleSidebar()} className="m-5">
            <LuPanelLeft size={30} />
          </button>
          <div className="flex items-center justify-center w-full mb-4">
            <SpinnerWithIcon size={40} loading={loading} icon={photoUrl} />
          </div>

          <nav className="grid grid-rows-1 gap-1 w-full">
            <Link
              className="flex py-2 justify-center items-center max-w-64 hover:bg-gray-200 rounded-lg"
              href="/Chat"
            >
              <BsChatHeart size={30} />
            </Link>
            <Link
              className="flex py-2 justify-center items-center max-w-64 hover:bg-gray-200 rounded-lg"
              href="/Calendar"
            >
              <BsCalendarHeart size={30} />
            </Link>
            <Link
              className="flex py-2 justify-center items-center max-w-64 hover:bg-gray-200 rounded-lg"
              href="/Task"
            >
              <MdOutlineTaskAlt size={30} />
            </Link>
            <Link
              className="flex py-2 justify-center items-center max-w-64 hover:bg-gray-200 rounded-lg"
              href="/Test"
            >
              <GiSpikedDragonHead size={30} />
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
