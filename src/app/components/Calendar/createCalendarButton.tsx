// カレンダー新規作成ボタン

import { useAddCalendar } from "@/utils/Calendar/addCalendar";
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { InputFieldBold } from "../inputs/inputFieldBold";
import { BasicCheckBox } from "../buttons/basicCheckBox";

export const CreateCalendar: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [share, setShare] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const addCalendar = useAddCalendar();

  const AddNewCalendar = () => {
    addCalendar(theme, share, description);
    setTheme("");
    setDescription("");
  };

  const toggeleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const toggleShare = () => {
    setShare((prev) => !prev);
  };

  const validate = (): boolean => {
    console.log(description.trim().length == 0);
    if (theme.trim().length == 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex items-center">
      {/* カレンダー作成用モーダルの開閉ボタン */}
      <button
        onClick={() => toggeleModal()}
        className="flex items-center justify-center"
      >
        <FaCirclePlus
          className="rounded-full bg-white text-pink-300"
          size={25}
        />
      </button>

      {/* カレンダー作成モーダル */}
      {openModal && (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            AddNewCalendar();
            toggeleModal();
          }}
          className="ralative w-96 h-96 rounded-2xl p-6
          flex flex-col gap-2
          bg-white border border-gray-50 shadow-xl
          absolute top-10 z-10"
        >
          
          <h1 className="text-center tex-2xl font-bold"> カレンダー設定</h1>

          {/* テーマ入力 */}
          <div className="w-full flex flex-col p-2 mb-2">
            <h1 className="font-semibold">テーマ</h1>
            <InputFieldBold value={theme} onChange={(e)=>setTheme(e.target.value)} placeholder="テーマを入力"/>

          </div>

          {/* 説明入力 */}
          <div className="w-full flex flex-col p-2 mb-2">
            <h1 className="font-semibold">説明</h1>
            <InputFieldBold value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="説明を入力"/>
          </div>

          {/* 共有 */}
          <div className="w-full flex justify-between px-2">
            <h1 className="font-semibold">共有</h1>
            <BasicCheckBox onClick={toggleShare} checked={share}/>
          </div>

          {/* 送信・キャンセルボタン */}
          <div className="grow flex justify-end items-end">
            <button
              onClick={() => toggeleModal()}
              className={`px-2 py-2 mx-1 rounded-md border border-gray-200 text-gray-400 font-semibold tex duration-500 hover:text-gray-500 hover:bg-gray-300`}
              type="button"
            >
              キャンセル
            </button>
            <button
              disabled={validate()}
              className={`px-6 py-2 mx-1 rounded-md font-bold border ${
                validate()
                  ? "border-gray-200 text-gray-400"
                  : "bg-pink-400  text-white border-pink-400 duration-500 hover:bg-pink-600"
              }`}
              type="submit"
            >
              作成
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
