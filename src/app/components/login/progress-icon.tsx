// setProfile iconで用いる
import Image from "next/image";
import BasicButton from "../buttons/BasicButton";
import useSignStore from "@/Context/signStore";

export const Icon: React.FC = () => {
  const profile = useSignStore((state) => state.profile);
  const setProfile = useSignStore((state) => state.setProfile);
  const setProgress = useSignStore((state)=>state.setProgress)
  const icons = Array.from({ length: 12 }, (_, i) => `/icons/icon${i + 1}.png`);
  const handleSelectIcon = (icon: string) => {
    setProfile({ ...profile!, icon });
  };
  return (
    <div>
      <h1 className="text-lg sm:tex-xl w-full mb-8 font-bold">アイコンを決めてください</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {icons.map((path, index) => (
          <div
            key={index}
            onClick={() => handleSelectIcon(path)}
            className={`flex justify-center items-center cursor-pointer border-4 hover:border-pink-500 rounded-lg
                      ${path == profile?.icon ? "border-pink-500" : "border:gray-500"}`}
          >
            <Image src={path} width={60} height={60} alt={`Icon ${index + 1}`} className="w-24 h-24 object-fit" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={()=>setProgress("name")}
          className="
              bg-pink-400 text-white text-lg font-semibold rounded-lg w-full py-2 
              transition duration-500 hover:bg-pink-500 mb-8"
        >
          前へ
        </button>
        <BasicButton type='button' onClick={()=>setProgress('birthDay')} disabled={!profile?.icon}>
          次へ
        </BasicButton>
      </div>
    </div>
  );
};
