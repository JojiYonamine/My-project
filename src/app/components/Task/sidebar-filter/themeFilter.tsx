// テーマフィルター
import useAuthStore from "@/Context/authStore";
import useTaskThemeStore from "@/Context/Task/taskThemeStore";
import { useEffect } from "react";
import { ThemeItem } from "./themeItem";

export const ThemeFilter = () => {
  const { taskThemes, selectedThemes, setSelectedThemes, initializeTaskThemes } = useTaskThemeStore();
  const { loading, currentCid } = useAuthStore();

  //   テーマ全選択・解除
  const handleSelectAll = () => {
    if (selectedThemes.length == taskThemes.length) setSelectedThemes([]);
    else setSelectedThemes(taskThemes);
  };

  useEffect(() => {
    if (loading || !currentCid) return;
    console.log("タスクテーマ、リスナー開始");
    const unsubcribe = initializeTaskThemes(currentCid);
    return () => {
      unsubcribe();
      console.log("タスクテーマ、リスナー解除");
    };
  }, [currentCid]);

  return (
    <div className="w-full flex flex-col grow text-center gap-2">
      <h1 className="font-semibold bg-pink-400 text-white p-1 rounded-lg max-h-8">テーマフィルター</h1>

      <button onClick={handleSelectAll} className="font-bold bg-pink-400 hover:bg-pink-500 text-white rounded-md">
        全選択
      </button>

      <div className="max-h-[600px] flex flex-col overflow-y-scroll">
        {taskThemes.map((theme) => (
          <ThemeItem theme={theme} key={theme.taskThemeId} />
        ))}
      </div>
    </div>
  );
};
