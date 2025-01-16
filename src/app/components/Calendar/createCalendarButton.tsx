// カレンダーを新規作成するボタン
import { AddCalendar } from "@/utils/Calendar/addCalendar";
import { useState } from "react";

export const CreateCalendarButton: React.FC = () => {
      const [description, setDescription] = useState<string>("");
      const [share, setShare] = useState<boolean>(false);
      const [theme, setTheme] = useState<string>("");

      const addNewCalendar = () => {
        AddCalendar(theme,share,description)
        setTheme("");
        setDescription("");
        setShare(false);
      };

        const handleChangeShare = (e: React.ChangeEvent<HTMLInputElement>) => {
          setShare(e.target.checked);
        };
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addNewCalendar();
      }}
    >
      <input
        type="text"
        placeholder="テーマを入力"
        value={theme}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTheme(e.target.value);
        }}
      />
      <label>
        <input type="checkbox" checked={share} onChange={handleChangeShare} />
        共有
      </label>
      <input
        type="text"
        placeholder="説明を入力"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(e.target.value);
        }}
      />
      <button type="submit">カレンダーを登録</button>
    </form>
  );
};
