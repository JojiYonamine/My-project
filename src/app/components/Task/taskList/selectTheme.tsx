import useTaskThemeStore from "@/Context/Task/taskThemeStore";
import { Task} from "@/types/taskTypes";

interface selectThemeProps {
  task: Task;
  setTask: (task: Task) => void;
}

export const SelectTheme: React.FC<selectThemeProps> = ({ task, setTask }) => {
  const themes = useTaskThemeStore((state) => state.taskThemes);
  const setTheme = (themeId:string) =>{
    setTask({...task,themeId:themeId})
  }

  return (
    <div className="max-h-[40px] flex flex-col overflow-y-scroll bg-white items-center">
      {themes.map((theme) => (
        <span 
        className={`${theme.taskThemeId ===task.themeId && "font-bold" } border w-full  overflow-hidden min-h-[30px] max-w-[200px] text-gray-700 text-center`}
        style={{ backgroundColor: theme.color }}
        key={theme.taskThemeId} onClick={()=>setTheme(theme.taskThemeId!)}>{theme.name}</span>
      ))}
    </div>
  );
};
