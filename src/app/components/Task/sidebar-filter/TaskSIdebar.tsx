import useTaskStore from "@/Context/Task/taskStore";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { ThemeFilter } from "./themeFilter";
import { DoneFilter } from "./doneFilter";

// タスクのサイドバー、フィルターを表示する
export const TaskSidebar = () => {
  const {
    sidebarOpen,
    setSidebarOpen,
  } = useTaskStore();

  // フィルターの開閉
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`h-screen w-full overflow-y-auto bg-pink-100
      transition-all duration-500 ${
        sidebarOpen ? "max-w-60" : "max-w-0 opacity-50"
      }
      `}
    >
      {/* サイドバーの開閉・テーマの新規作成ボタン */}
      <div className="m-2 flex justify-between items-center p-2">
        <button onClick={() => handleToggleSidebar()}>
          <RxDoubleArrowLeft size={25} />
        </button>
      </div>

      <ThemeFilter/>

      <DoneFilter/>
    </div>
  );
};
