import { ToggleSidebarButton } from "@/components/buttons/toggleSidebarButton";
import useTaskOtherStore from "@/Context/Task/taskOtherStore";
import useTaskThemeStore from "@/Context/Task/taskThemeStore";

export const TaskHeader: React.FC = () => {
  const sidebarOpen = useTaskOtherStore((state) => state.sidebarOpen);
  const setSidebarOpen = useTaskOtherStore((state) => state.setSidebarOpen);
  const selectedThemes = useTaskThemeStore((state)=>state.selectedThemes)

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex justify-start gap-4 w-full items-center p-2 h-full max-h-[7vh] bg-pink-100">
      <ToggleSidebarButton onClick={() => handleToggleSidebar()} disabled={sidebarOpen} which="open" />
        {selectedThemes.map((theme)=>(
        <span key={theme.taskThemeId}>{theme.name}</span>
        ))}
    </div>
  );
};
