import useChatStore from "@/Context/chatStore";
import { RxDoubleArrowRight } from "react-icons/rx";

export const ChatHeader = () => {
  const sidebarOpen = useChatStore((state) => state.sidebarOpen);
  const setSidebarOpen = useChatStore((state) => state.setSidebarOpen);
  const selectedChatRoom = useChatStore((state) => state.selectedChatRoom);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="flex w-full justify-between p-2 mb-2 max-h-[6vh]">
      <button
        className={`transition-all duration-500 ${
          !sidebarOpen ? "" : "opacity-0"
        }`}
        disabled={sidebarOpen}
        onClick={() => handleToggleSidebar()}
      >
        <RxDoubleArrowRight size={25} />
      </button>
      <div className="w-full flex items-center justify-center">
        <h1 className="text-2xl font-bold">{selectedChatRoom}</h1>
      </div>
    </div>
  );
};
