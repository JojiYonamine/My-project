import useSignStore from "@/Context/signStore";
import { BasicCheckBox } from "../buttons/basicCheckBox";

export const Checklist = () => {
  const formError = useSignStore((state) => state.formError);
  if(!formError){
    return
  }
  return (
    <div className="flex flex-col gap-2 w-full justify-center">
      <div className="flex items-center">
        <BasicCheckBox checked={!formError.emailError} disbaled={true} size={20} />
        <span className={`text-sm  ml-2 ${!formError.emailError?"text-pink-500 font-bold":"text-gray-400 font-semibold"}`}>正しいメールアドレス</span>
      </div>

      <div className="flex items-center">
        <BasicCheckBox checked={!formError.passwordError} disbaled={true} size={20} />
        <span className={`text-sm  ml-2 ${!formError.passwordError?"text-pink-500 font-bold":"text-gray-400 font-semibold"}`}>6文字以上のパスワード</span>
      </div>

      <div className="flex items-center">
        <BasicCheckBox checked={!formError.confirmError} disbaled={true} size={20} />
        <span className={`text-sm  ml-2 ${!formError.confirmError?"text-pink-500 font-bold":"text-gray-400 font-semibold"}`}>再確認と一致</span>
      </div>
    </div>
  );
};
