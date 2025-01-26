// editingThemeの存在を検知してモーダルを開く

import { BasicCheckBox } from "@/components/buttons/basicCheckBox";
import { CancelButton } from "@/components/buttons/cancelButton";
import { ColorPicker } from "@/components/buttons/ColorPicker";
import { MySubmitButton } from "@/components/buttons/MySubmitButton";
import { InputFieldBold } from "@/components/inputs/inputFieldBold";
import useTaskThemeStore from "@/Context/Task/taskThemeStore";
import { useEditObject } from "@/utils/others/editObject";
import { useEditBoolean } from "@/utils/others/editObjectBoolean";
import { useTaskTheme } from "@/utils/Task/taskThemeHandler";
import { validateTheme } from "@/utils/Task/validateTheme";

export const EditThemeModal = () => {
  const { editingTheme, setEditingTheme } = useTaskThemeStore();
  const isEdit = editingTheme?.taskThemeId ? true : false;
  const uploadTheme = useTaskTheme(isEdit ? "edit" : "create");
  const deleteTheme = useTaskTheme("delete");
  const editTheme = useEditObject(editingTheme, setEditingTheme);
  const toggleShare = useEditBoolean(editingTheme, setEditingTheme, "share");
  const validate = (): boolean => {
    const errors = validateTheme(editingTheme);
    if (errors.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="flex items-center">
      {editingTheme && (
        <form
          className="ralative rounded-2xl p-6
                    flex flex-col gap-2
                    bg-white border border-gray-50 shadow-xl
                    absolute top-10 z-10"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            uploadTheme();
          }}
        >
          {/* テーマ名の入力 */}
          <InputFieldBold
            placeholder="テーマ名を入力"
            name="name"
            value={editingTheme?.name || ""}
            onChange={(e) => editTheme(e)}
          />

          {/* 共有の設定 */}
          <div className="w-full flex justify-between px-2">
            <h1 className="font-semibold">共有</h1>
            <BasicCheckBox onClick={() => toggleShare()} checked={editingTheme?.share} />
          </div>

          {/* テーマカラーの選択 */}
          <ColorPicker object={editingTheme} setObject={setEditingTheme} />

          {/* 送信・キャンセル・削除ボタン */}
          <div className="grow flex justify-end items-end">
            <MySubmitButton text={`${isEdit ? "更新" : "作成"}`} disabled={validate()} />
            <CancelButton onClick={() => setEditingTheme(null)} />
            {isEdit && (
              <button
                onClick={() => deleteTheme()}
                className={`px-2 py-2 mx-1 rounded-md border border-gray-200 text-gray-400 font-semibold tex duration-500 hover:text-gray-500 hover:bg-gray-300`}
                type="button"
              >
                削除
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
