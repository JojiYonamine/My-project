// テーマの新規作成・編集を行う
// 新規作成ボタンが押された時、表示中のテーマがクリックされた時呼びだす
// 特に、表示中が呼び出された時には、表示用のカードからこっちに違和感なく切り替わるようにする
// →テーマがeditingThemeの時に、非表示にして、editingThemeが表示されるようにする切り替えて表示するようにする
// 新規作成時には、テーマリストに新たなテーマが追加されて編集しているような感じにしよう
// →firestoreにはアップロードせずに表示だけしてキャンセルされたら削除、登録されたらアップロードって感じにしよう

import { BasicCheckBox } from "@/components/buttons/basicCheckBox";
import { InputFieldBold } from "@/components/inputs/inputFieldBold";
import useTaskThemeStore from "@/Context/Task/taskThemeStore";
import { TaskTheme } from "@/types/taskTypes";
import { useEditObject } from "@/utils/others/editObject";
import { useTaskTheme } from "@/utils/Task/taskThemeHandler";
import { useEffect } from "react";

// タスクのテーマの作成・編集フォーム
export const EditThemeCard: React.FC = () => {
  const { editingTheme, setEditingTheme } = useTaskThemeStore();

  //   編集中のテーマがない時新規作成
  useEffect(() => {
    if (!editTheme) {
      const newTheme: TaskTheme = {
        name: "",
        color: "#ff7fbf",
        share: true,
        createdAt: new Date(),
      };
      setEditingTheme(newTheme);
    }
  }, []);

  //   編集中のテーマが存在する時に、isEditing true
  const isEdit = editingTheme ? true : false;
  const handleTheme = useTaskTheme(isEdit ? "edit" : "create");
  const editTheme = useEditObject(editingTheme, setEditingTheme);
  const toggleShare = () => {
    const newShare = !editingTheme?.share;
    const newTheme: TaskTheme = {
      ...editingTheme,
      share: newShare,
    } as TaskTheme;
    setEditingTheme(newTheme);
  };
  return (
    <form onSubmit={(e)=>{e.preventDefault();handleTheme()}}>
        {/* テーマ名の入力 */}
      <InputFieldBold
        placeholder="テーマ名を入力"
        name="name"
        value={editingTheme?.name || ""}
        onChange={(e) => editTheme(e)}
      />

      {/* 共有の設定 */}
      <div>
        <h1>share</h1>
        <BasicCheckBox onClick={() => toggleShare()} checked={editingTheme?.share} />
      </div>

      {/* テーマカラーの選択 */}
      <ColorPicker object={editingTheme} setObject={setEditingTheme} />

    </form>
  );
};
