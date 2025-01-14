import Link from "next/link";
import { BsChatHeart, BsCalendarHeart } from "react-icons/bs";
import { MdOutlineTaskAlt } from "react-icons/md";
import { LuPanelLeft } from "react-icons/lu";
import { GiSpikedDragonHead } from "react-icons/gi";
import { IoIosNotifications, IoIosClose } from "react-icons/io";

import useAuthStore from "@/Context/authStore";
import { useState } from "react";
import { SpinnerWithIcon } from "./loadingSpinner";
import { auth } from "@/config/firebaseConfig";
import { Logout } from "@/utils/Auth/logout";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const photoUrl = currentUser?.photoURL;
  const loading = useAuthStore((state) => state.loading);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const root = useRouter();

  const handleToggleSidebar = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const SideBarNav = ({ isOpen }: { isOpen: boolean }) => {
    return (
      <nav
        className={`grid  grid-rows-1 gap-1 w-full transition-all${
          sideBarOpen ? "w-64" : "w-16 "
        } overflow-hidden`}
      >
        <Link
          className={`py-2 pl-4 flex items-center w-full hover:bg-gray-200 ${
            isOpen ? "w-64" : "w-16"
          }`}
          href="/Chat"
        >
          <BsChatHeart size={30} />
          {sideBarOpen && <span className={`ml-4 text-lg`}>CHAT</span>}
        </Link>

        <Link
          className={`py-2 pl-4 flex items-center w-full hover:bg-gray-200${
            isOpen ? "w-64" : "w-0"
          }`}
          href="/Calendar"
        >
          <BsCalendarHeart size={30} />
          {sideBarOpen && <span className={`ml-4 text-lg`}>CALENDAR</span>}
        </Link>
        <Link
          className={`py-2 pl-4 flex items-center w-full hover:bg-gray-200 ${
            isOpen ? "w-64" : "w-16"
          }`}
          href="/Task"
        >
          <MdOutlineTaskAlt size={30} />
          {sideBarOpen && <span className={`ml-4 text-lg`}>TASK</span>}
        </Link>
        <Link
          className={`py-2 pl-4 flex items-center w-full hover:bg-gray-200 ${
            isOpen ? "w-64" : "w-16"
          }`}
          href="/Test"
        >
          <GiSpikedDragonHead size={30} />
          {sideBarOpen && <span className={`ml-4 text-lg`}>TEST</span>}
        </Link>
      </nav>
    );
  };

  return (
    <div
      className={`
      bg-pink-100 relative transition-all duration-300
    ${sideBarOpen ? "w-64" : "w-16"}
    `}
    >
      {modalOpen && (
        <div
          className="absolute top-4 left-16 z-10 p-2
          min-w-52 min-h-52
            flex flex-col justify-center text-center 
            bg-white
            rounded-2xl 
            border border-gray-50 shadow-xl"
        >
          <div className="flex justify-end items-center">
            <button
              onClick={() => handleToggleModal()}
              className="rounded-full bg-pink-200 "
            >
              <IoIosClose size={30} className="text-white " />
            </button>
          </div>

          <SpinnerWithIcon size={70} loading={loading} icon={photoUrl} />
          <h1 className="font-bold m-4">{currentUser?.displayName}</h1>
          <button onClick={() => {Logout(auth, root);root.push("/Auth/Login")}}
            className="text-white font-bold bg-pink-200 rounded-xl p-2"
            >ログアウト</button>
        </div>
      )}

      {/* サイドバー */}
      <div
        className={`h-screen flex bg-pink-50 flex-col transition-all duration-300
          ${sideBarOpen ? "w-64" : "w-16"}
          `}
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
            <IoIosNotifications
              className="text-gray-700 hover:text-black"
              size={25}
            />
          </div>
        </div>

        {/* ユーザー情報 */}
        <div className="flex  items-center justify-between w-full mb-4 overflow-hidden">
          <button
            type="button"
            className="pl-3"
            onClick={() => handleToggleModal()}
          >
            <SpinnerWithIcon size={40} loading={loading} icon={photoUrl} />
          </button>
        </div>

        {/* ナビゲーション */}
        <SideBarNav isOpen={sideBarOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
