// テーマリストに表示するアイテム、クリックでeditingThemeに設定、editingThemeに設定された際には非表示
import useTaskThemeStore from "@/Context/Task/taskThemeStore";
import { TaskTheme } from "@/types/taskTypes";
import { FaEdit } from "react-icons/fa";

interface ThemeItemProps {
  theme: TaskTheme;
}

export const ThemeItem: React.FC<ThemeItemProps> = ({ theme }) => {
  const { selectedThemes, setSelectedThemes, setEditingTheme } = useTaskThemeStore();
  //   テーマが選択されているか
  const isSelected: boolean = selectedThemes.includes(theme) ? true : false;

  //   テーマの選択
  const toggleThemeSelect = (theme: TaskTheme) => {
    if (isSelected) {
      const newThemes = selectedThemes.filter((t) => t.taskThemeId !== theme.taskThemeId);
      setSelectedThemes(newThemes);
    } else {
      const newThemes = [...selectedThemes, theme];
      setSelectedThemes(newThemes);
    }
  };

  return (
    <div
      className={`relative w-full max-w-[300px] min-h-8 rounded-md my-1 flex justify-between items-center border-2 overflow-hidden ${
        isSelected ? "border-white" : "border-gray-200"
      }`}
      style={{ backgroundColor: theme.color }}
    >
      <button className="w-full" onClick={() => toggleThemeSelect(theme)}>
        <span className={`${isSelected && "font-bold"} text-gray-700`}>{theme.name}</span>
      </button>
      <button className="absolute right-2 " onClick={() => setEditingTheme(theme)}>
        <FaEdit className="text-white" size={20} />
      </button>
    </div>
  );
};
