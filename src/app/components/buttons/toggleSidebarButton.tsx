// 各機能のサイドバーの開閉用

import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";
import {} from "react-icons/rx";

interface ToggleSidebarProps {
  disabled:boolean
  onClick: () => void;
  which: "open" | "close";
}

export const ToggleSidebarButton: React.FC<ToggleSidebarProps> = ({ disabled, onClick, which }) => {
  // which = openの時に、disabled=true
  return (
    <button className={`transition-all duration-500 ${disabled && "opacity-0"}`} disabled={disabled} onClick={onClick}>
      {which == "open" ? <RxDoubleArrowRight size={25} /> : <RxDoubleArrowLeft size={25} />}
    </button>
  );
};
