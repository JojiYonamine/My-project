"use client";
import { auth } from "@/config/firebaseConfig";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SetProfile = () => {
  type progress = "name" | "icon" | "birthDay";
  const [progress, setProgress] = useState<progress>("name");
  const [name, setName] = useState<string>("");
  const [icon, setICon] = useState<string>("");
  const [birthDay, setBirthDay] = useState<Date>(new Date());
  const user = auth.currentUser;
  const root = useRouter();

  const icons = Array.from({ length: 12 }, (_, i) => `/icons/icon${i + 1}.png`);
  //   if(!user){
  //     root.push('/Auth/Signup')
  //     return
  //   }

  //   最終的に登録ボタンを押した時に使用する
  const handleUpadateProfile = async () => {
    try {
      await updateProfile(user, { displayName: name, photoURL: photo });
    } catch (err: unknown) {
      alert(err);
    }
  };

  const handleNext = () => {
    if (progress == "name") setProgress("icon");
    else if (progress == "icon") setProgress("birthDay");
  };

  const handleBack = () => {
    if (progress == "icon") setProgress("name");
    else if (progress == "birthDay") setProgress("icon");
  };

  const handleSelectIcon = (icon: string) => {
    setICon(icon);
    console.log(icon)
  };

  return (
    // ページ表示
    <div className="h-screen flex justify-center text-center items-center">
      {/* カード表示 */}
      <div className="bg-white rounded p-6 w-11/12 sm:mt-0  max-w-lg border border-gray-300">
        <form>
          {progress == "name" && (
            <div>
              <h1 className="text-xl w-full mb-8 font-semibold break-words">
                ニックネームを決めてください！
              </h1>
              <input
                placeholder="だいすけ"
                value={name}
                className="w-full
              text-xl rounded-lg px-4 py-2 border border-gray-400 
              focus:outline-none mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
              />
              <button
                onClick={handleNext}
                className="
              bg-pink-400 text-white text-lg font-bold rounded-lg w-full py-2 
              transition duration-500 hover:bg-pink-500 "
              >
                次へ
              </button>
            </div>
          )}
          {progress == "icon" && (
            <div >
              <h1 className="text-lg sm:tex-xl w-full mb-8 font-bold">
                アイコンを決めてください
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {icons.map((path, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectIcon(path)}
                    className={
                      `flex justify-center items-center cursor-pointer border-4 hover:border-pink-500 rounded-lg
                      ${path==icon ? "border-pink-500":"border:gray-500"}`
                    }
                  >
                    <img
                      src={path}
                      alt={`Icon ${index + 1}`}
                      className="w-24 h-24 object-fit"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleBack}
                  className="
              bg-pink-400 text-white text-lg font-bold rounded-lg w-full py-2 
              transition duration-500 hover:bg-pink-500 "
                >
                  前へ
                </button>
                <button
                  onClick={handleNext}
                  className="
              bg-pink-400 text-white text-lg font-bold rounded-lg w-full py-2 
              transition duration-500 hover:bg-pink-500 "
                >
                  次へ
                </button>
              </div>
            </div>
          )}

          {progress == "birthDay" && (
            <div>
              <h1 className="text-xl w-full mb-8 font-bold">
                誕生日を入力してください
              </h1>
              <button onClick={handleBack}>前へ</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SetProfile;
