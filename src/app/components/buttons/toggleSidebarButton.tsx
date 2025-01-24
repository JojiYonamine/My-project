// 各機能のサイドバーの開閉用

import { RxDoubleArrowRight } from "react-icons/rx";

interface ToggleSidebarProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ToggleSidebarButton: React.FC<ToggleSidebarProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className={`transition-all duration-500 ${isOpen && "opacity-0"}`}
      disabled={isOpen}
      onClick={onClick}
    >
      <RxDoubleArrowRight size={25} />
    </button>
  );
};
