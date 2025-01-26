// 空のテーマをeditingThemeに渡す
import useTaskThemeStore from "@/Context/Task/taskThemeStore";
import { TaskTheme } from "@/types/taskTypes";
import { FaCirclePlus } from "react-icons/fa6";


export const CreateThemeButton = () => {
  const { setEditingTheme } = useTaskThemeStore();
  const createNewTheme = () => {
    const newTheme: TaskTheme = {
        name: "",
        color: "#ff7fbf",
        share: true,
        createdAt: new Date(),
        icon:null
      };
      setEditingTheme(newTheme)
  };

  return (
    <button
      onClick={() => createNewTheme()}
      className="flex items-center justify-center"
    >
      <FaCirclePlus className="rounded-full bg-white text-pink-300" size={25} />
    </button>
  );
};
