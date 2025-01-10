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
      <div
        className={`h-screen flex bg-pink-50 flex-col transition-all duration-300
        ${isOpen ? "w-64" : "w-16"} `}
      >
        {/* オープン・クローズ */}
        <div
          className={`flex items-center justify-between w-16 my-1 px-2 py-3
            `}
        >
          <button onClick={() => handleToggleSidebar()}>
            <LuPanelLeft size={25} />
          </button>

          <div className="pr-1">
            <IoIosNotifications size={25} />
          </div>
        </div>

        {/* ユーザー情報 */}
        <div className="flex  items-center justify-between w-full mb-4 overflow-hidden">
          <div className="pl-3">
            <SpinnerWithIcon size={40} loading={loading} icon={photoUrl} />
          </div>
        </div>
        {/* ナビゲーション */}
        <nav className="grid grid-rows-1 gap-1 w-full overflow-hidden pl-1">
          <Link
            className={`pl-4 py-2 flex items-center max-w-64 hover:bg-gray-200`}
            href="/Chat"
          >
            <BsChatHeart size={30} />
            <span className={`ml-4 text-lg`}>CHAT</span>
          </Link>
          <Link
            className={`pl-4 py-2 flex items-center max-w-64 hover:bg-gray-200`}
            href="/Calendar"
          >
            <BsCalendarHeart size={30} />
            <span className={`ml-4 text-lg`}>CALENDAR</span>
          </Link>
          <Link
            className={`pl-4 py-2 flex items-center max-w-64 hover:bg-gray-200`}
            href="/Task"
          >
            <MdOutlineTaskAlt size={30} />
            <span className={`ml-4 text-lg`}>TASK</span>
          </Link>

          <Link
            className={`pl-4 py-2 flex items-center max-w-64 hover:bg-gray-200`}
            href="/Test"
          >
            <GiSpikedDragonHead size={30} />
            <span className={`ml-4 text-lg`}>TEST</span>
          </Link>
        </nav>
      </div>

      {/* <div className="h-screen w-16 flex bg-pink-50 flex-col">
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
        </div> */}
    </div>
  );
};

export default Sidebar;
