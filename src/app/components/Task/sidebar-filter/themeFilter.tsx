// テーマフィルター
import useTaskThemeStore from "@/Context/Task/taskThemeStore";
import { TaskTheme } from "@/types/taskTypes";


export const ThemeFilter = () => {
  const themes = useTaskThemeStore((state) => state.taskThemes);
  const selectedThemes = useTaskThemeStore((state) => state.selectedThemes);
  const setSelectedThemes = useTaskThemeStore((state) => state.setSelectedThemes);

  //   テーマの選択
  const toggleThemeSelect = (theme: TaskTheme) => {
    if (selectedThemes.includes(theme)) {
      const newThemes = selectedThemes.filter((t) => t.taskThemeId !== theme.taskThemeId);
      setSelectedThemes(newThemes);
    } else {
      const newThemes = [...selectedThemes, theme];
      setSelectedThemes(newThemes);
    }
  };

  //   テーマ全選択・解除
  const handleSelectAll = () => {
    if (selectedThemes.length == themes.length) setSelectedThemes([]);
    else setSelectedThemes(themes);
  };

  return (
    <div>
      <h1>テーマフィルター</h1>
      <button onClick={handleSelectAll}>全選択</button>
      {themes.map((theme) => (
        <label key={theme.taskThemeId}>
          <input
            type="checkbox"
            checked={selectedThemes.includes(theme)}
            value={theme.name}
            onChange={() => {
              toggleThemeSelect(theme);
            }}
          />
          {theme.name}
        </label>
      ))}
    </div>
  );
};
