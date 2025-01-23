// テーマフィルター
import useTaskStore from "@/Context/taskStore";

export const ThemeFilter = () => {
  const themes = useTaskStore((state)=>state.themes)
  const selectedThemes = useTaskStore((state)=>state.selectedThemes)
  const setSelectedThemes = useTaskStore((state)=>state.setSelectedThemes)

  //   テーマの選択
  const toggleThemeSelect = (theme: string) => {
    if (selectedThemes.includes(theme)) {
      const newThemes = selectedThemes.filter((t) => t !== theme);
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
        <label key={theme}>
          <input
            type="checkbox"
            checked={selectedThemes.includes(theme)}
            value={theme}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              toggleThemeSelect(e.target.value);
            }}
          />
          {theme}
        </label>
      ))}
    </div>
  );
};
