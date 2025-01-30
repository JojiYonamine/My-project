import useSignStore from "@/Context/signStore";
import BasicButton from "../buttons/BasicButton";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { profileType } from "@/types/formtypes";

interface completeProps {
  inviterName: string | null;
}

export const Complete: React.FC<completeProps> = ({ inviterName }) => {

  const inviterId = useSignStore((state) => state.inviterId);
  const inviteLink = useSignStore((state) => state.inviteLink);
  const prof = useSignStore((state) => state.profile);
  const root = useRouter();
  const setProf = useSignStore((state) => state.setProfile);
  console.log(inviteLink);
  const buttonFunc = () => {
    const newProf: profileType = {
      name: "",
      icon: "",
      birthday: new Date(2003, 0o4, 0o2),
    };
    setProf(newProf);
    root.push("/");
  };

  return (
    <div>
      {/* 招待されていない時 */}
      {!inviterId && (
        <div className="flex flex-col gap-4 justify-center">
          <h1 className="text-xl w-full font-semibold break-words">登録が完了しました！</h1>
          <h1 className="text-xl w-full font-semibold break-words">パートナーを招待しましょう！</h1>
          <h1 className="text-xl w-full font-semibold break-words">{inviteLink}</h1>
          <div className="w-full flex items-center justify-center">
            <QRCodeCanvas
              value={inviteLink ? inviteLink : "https://my-project-yftg.vercel.app"}
              size={200}
              className="p-2 border rounded-md"
            />
          </div>
          <BasicButton onClick={() => buttonFunc()} text="ホームへ" />
        </div>
      )}

      {/* 招待されている時 */}
      {inviterId && (
        <div>
          <div className="text-center">
            <h1 className="text-xl w-full mb-8 font-semibold break-words">
              {`${inviterName}と${prof?.name}のカップルを登録しました!`}
            </h1>
            <BasicButton onClick={() => buttonFunc()} text="ホームへ" />
          </div>
        </div>
      )}
    </div>
  );
};
