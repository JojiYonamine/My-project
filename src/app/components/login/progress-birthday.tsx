// setProfile birthdayで用いる
import useSignStore from "@/Context/signStore";
import BasicButton from "../buttons/BasicButton";
import { InputDate } from "../inputs/inputDate";
import { MySubmitButtonWithSpinner } from "../buttons/MySubmitButton";

export const BirthDay: React.FC = () => {
  const profile = useSignStore((state) => state.profile);
  const setProfile = useSignStore((state) => state.setProfile);
  const setProgress = useSignStore((state) => state.setProgress);
  const setDate = (date: Date) => {
    setProfile({ ...profile!, birthday: date });
  };
  const loading = useSignStore((state) => state.loading);

  return (
    <div className="relative flex flex-col gap-10 justify-center">
      <h1 className="text-xl w-full font-bold">誕生日を入力してください</h1>
      <div className="flex items-center justify-center w-full ">
        <InputDate date={profile?.birthday} setDate={setDate} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <BasicButton type="button" onClick={() => setProgress("icon")} text="前へ" />

        <MySubmitButtonWithSpinner color="border-white" text="登録" disabled={!profile?.birthday} loading={loading} />
      </div>
    </div>
  );
};
