// サイドバーに表示するリンク
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { BsChatHeart, BsCalendarHeart } from "react-icons/bs";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GiSpikedDragonHead } from "react-icons/gi";

interface SidebarLinkProps {
  isOpen: boolean;
  link: string;
  title: string;
  Icon: IconType;
}

// サイドバーに表示するリンクのボタン
const SidebarLink: React.FC<SidebarLinkProps> = ({ isOpen, link, title, Icon }) => {
  return (
    <Link className={`py-2 pl-4 flex items-center w-full hover:bg-gray-200 ${isOpen ? "w-64" : "w-16"}`} href={link}>
      <Icon size={30} />
      {isOpen && <span className={`ml-4 text-lg`}>{title}</span>}
    </Link>
  );
};

interface SidebarNavProps {
  isOpen: boolean;
}

// サイドバーに表示するリンクをまとめたもの
export const SidebarNav: React.FC<SidebarNavProps> = ({ isOpen }) => {
  return (
    <nav className={`grid  grid-rows-1 gap-1 w-full transition-all${isOpen ? "w-64" : "w-16 "} overflow-hidden`}>
      <SidebarLink isOpen={isOpen} link="/Chat" title="CHAT" Icon={BsChatHeart} />
      <SidebarLink isOpen={isOpen} link="/Calendar" title="CALENDAR" Icon={BsCalendarHeart} />
      <SidebarLink isOpen={isOpen} link="/Task" title="TASK" Icon={MdOutlineTaskAlt} />
      <SidebarLink isOpen={isOpen} link="/Test" title="TEST" Icon={GiSpikedDragonHead} />
    </nav>
  );
};
