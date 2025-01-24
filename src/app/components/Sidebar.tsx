import { LuPanelLeft } from "react-icons/lu";
import { IoIosNotifications } from "react-icons/io";
import useAuthStore from "@/Context/authStore";
import { useState } from "react";
import { SpinnerWithIcon } from "./loadingSpinner";
import { SidebarNav } from "./others/sidebar/sidebarLink";
import { SidebarModal } from "./others/sidebar/sidebarModal";

const Sidebar = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const photoUrl = currentUser?.photoURL;
  const loading = useAuthStore((state) => state.loading);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className={`bg-pink-100 relative transition-all duration-300 ${sideBarOpen ? "w-64" : "w-16"}`}>
      {/* モーダル */}
      <SidebarModal currentUser={currentUser} loading={loading} isOpen={modalOpen} onClick={handleToggleModal} />

      {/* サイドバー */}
      <div
        className={`h-screen flex bg-pink-50 flex-col transition-all duration-300
          ${sideBarOpen ? "w-64" : "w-16"}
          `}
      >
        {/* オープン・クローズ */}
        <div className={`flex items-center justify-between w-16 my-1 px-2 py-3`}>
          <button onClick={() => handleToggleSidebar()}>
            <LuPanelLeft size={25} />
          </button>

          <div className="pr-1">
            <IoIosNotifications className="text-gray-700 hover:text-black" size={25} />
          </div>
        </div>

        {/* ユーザー情報 */}
        <div className="flex  items-center justify-between w-full mb-4 overflow-hidden">
          <button type="button" className="pl-3" onClick={() => handleToggleModal()}>
            <SpinnerWithIcon size={40} loading={loading} icon={photoUrl} />
          </button>
        </div>

        {/* ナビゲーション */}
        <SidebarNav isOpen={sideBarOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
