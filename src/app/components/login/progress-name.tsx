// setProfile nameで用いる
import useSignStore from "@/Context/signStore";
import BasicButton from "../buttons/BasicButton";
import { useEditObject } from "@/utils/others/editObject";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

export const Name: React.FC = () => {
  const profile = useSignStore((state) => state.profile);
  const setProfile = useSignStore((state) => state.setProfile);
  const setProgress = useSignStore((state)=>state.setProgress)
  const editProf = useEditObject(profile, setProfile);

  // Google経由の時名前自動入力
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user && user.providerData?.length > 0) {
        const displayName = user.providerData[0].displayName || "";
        setProfile({...profile!,name:displayName});
      }
      return () => unsubcribe();
    });
  }, []);

  return (
    <div>
      <h1 className="text-xl w-full mb-8 font-semibold break-words">ニックネームを決めてください！</h1>
      <input
        placeholder="だいすけ"
        value={profile?.name}
        name="name"
        className="w-full
              text-xl rounded-lg px-4 py-2 border border-gray-400 
              focus:outline-none mb-4"
        onChange={editProf}
      />
      <BasicButton type='button' onClick={() => setProgress("icon")} disabled={!profile?.name.trim()}>
        次へ
      </BasicButton>
    </div>
  );
};
