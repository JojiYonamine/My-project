import { ThemeFilter } from "./themeFilter";
import { DoneFilter } from "./doneFilter";
import useTaskOtherStore from "@/Context/Task/taskOtherStore";

// import { useEditBoolean } from "@/utils/others/editObjectBoolean";
import { CreateThemeButton } from "./createThemeButton";
import { ToggleSidebarButton } from "@/components/buttons/toggleSidebarButton";
import { EditThemeModal } from "./editThemeModal";

// タスクのサイドバー、フィルターを表示する
export const TaskSidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useTaskOtherStore();
  // const toggleSidebar = useEditBoolean(sidebarOpen, setSidebarOpen);
  const toggleSidebar = () => {
    const newOpen = sidebarOpen?false:true
    setSidebarOpen(newOpen)
  }

  return (
    <div
      className={`h-screen w-full bg-pink-100 overflow-hidden
      transition-all duration-500 ${sidebarOpen ? "max-w-60" : "max-w-0 opacity-0"}
      `}
    >
      {/* サイドバーの開閉・テーマの新規作成ボタン */}
      <div className="flex justify-between items-center p-2">
        {/* テーマ新規作成用 */}
        <CreateThemeButton />
        {/* サイドバー開閉用 */}
        <ToggleSidebarButton disabled={!sidebarOpen} onClick={toggleSidebar} which="close" />
      </div>
      <EditThemeModal />
      <div className="flex flex-col gap-5">
      <DoneFilter />

      <ThemeFilter />
      </div>
    </div>
  );
};
