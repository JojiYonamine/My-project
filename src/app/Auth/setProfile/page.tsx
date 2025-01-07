"use client";
import { BasicButton } from "@/components";
import { auth } from "@/config/firebaseConfig";
import { RegisterCouple } from "@/utils/Auth/registerCouple";
import { dateToIso, IsoToDate } from "@/utils/dateUtils";
import { userRef } from "@/utils/firestoreRefs";
import { updateCurrentUser, updateProfile, User } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SetProfile = () => {
  type progress = "name" | "icon" | "birthDay" | "completed";
  const [progress, setProgress] = useState<progress>("name");
  const [name, setName] = useState<string>("");
  const [icon, setICon] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");
  const [inviterId, setInviterId] = useState<string>("");
  const user = auth.currentUser;
  const root = useRouter();

  const icons = Array.from({ length: 12 }, (_, i) => `/icons/icon${i + 1}.png`);
  //   if(!user){
  //     root.push('/Auth/Signup')
  //     return
  //   }
  const searchParams = useSearchParams();
  const InviterId = searchParams.get("inviterId");

  const registerUserProfile = async (user: User, birthDay: string) => {
    try {
      await setDoc(userRef(user.uid), {
        name: user.displayName || "Anonymous",
        email: user.email,
        cid: null,
        partnerId: null,
        birthDay: IsoToDate(birthDay),
        createdAt: new Date(),
      });
      console.log("User registered in Firestore!");
    } catch (err: unknown) {
      alert(err);
    }
  };

  //   最終的に登録ボタンを押した時に使用する
  const handleUpadateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(" now loading");
    if (!user) {
      console.log("need to login");
      alert("ログインしてください");
      root.push("/Auth/Signup");
      return;
    }

    try {
      console.log("now updating");
      await updateProfile(user, { displayName: name, photoURL: icon });
      await registerUserProfile(user, birthDay);
      if(InviterId){
        await RegisterCouple(InviterId,user.uid)
      }else{
        setInviterId(user.uid);
      }
      setProgress("completed");
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
    console.log(icon);
  };

  const generateInviteLink = (uid: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_INVITE_URL;
    return `${baseUrl}?inviterId=${encodeURIComponent(uid)}`;
  };

  return (
    // ページ表示
    <div className="h-screen flex justify-center text-center items-center">
      {/* カード表示 */}
      <div className="bg-white rounded p-6 w-11/12 sm:mt-0  max-w-lg border border-gray-300">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            handleUpadateProfile(e);
          }}
        >
          {/* 名前 */}
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
              <BasicButton
                onClick={handleNext}
                disabled={!name}
                // className=
                // {!name?("bg-pink-400 text-white text-lg font-bold rounded-lg w-full py-2 transition duration-500 hover:bg-pink-500")
                //     :("bg-white")}
              >
                次へ
              </BasicButton>
            </div>
          )}

          {/* アイコン */}
          {progress == "icon" && (
            <div>
              <h1 className="text-lg sm:tex-xl w-full mb-8 font-bold">
                アイコンを決めてください
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {icons.map((path, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectIcon(path)}
                    className={`flex justify-center items-center cursor-pointer border-4 hover:border-pink-500 rounded-lg
                      ${path == icon ? "border-pink-500" : "border:gray-500"}`}
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
              bg-pink-400 text-white text-lg font-semibold rounded-lg w-full py-2 
              transition duration-500 hover:bg-pink-500 mb-8"
                >
                  前へ
                </button>
                <BasicButton
                  onClick={handleNext}
                  disabled={!icon}
                  //       className="
                  //   bg-pink-400 text-white text-lg font-bold rounded-lg w-full py-2
                  //   transition duration-500 hover:bg-pink-500 "
                >
                  次へ
                </BasicButton>
              </div>
            </div>
          )}

          {/* 誕生日 */}
          {progress == "birthDay" && (
            <div className="relative">
              <h1 className="text-xl w-full mb-8 font-bold">
                誕生日を入力してください
              </h1>
              <input
                type="date"
                value={birthDay}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setBirthDay(e.target.value);
                }}
                className="mb-8 text-center w-full px-4 py-2 border border-gray-300 rounded-lg 
              shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-gray-700"
              />
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleBack}
                  className="
              bg-pink-400 text-white text-lg font-semibold rounded-lg w-full py-2 
              transition duration-500 hover:bg-pink-500 mb-8"
                >
                  前へ
                </button>
                <BasicButton
                  type="submit"
                  disabled={!birthDay}
                  //       className="
                  //   bg-pink-400 text-white text-lg font-bold rounded-lg w-full py-2
                  //   transition duration-500 hover:bg-pink-500 "
                >
                  登録
                </BasicButton>
              </div>
            </div>
          )}
        </form>
        {/* 招待 */}
        {!InviterId && progress == "completed" ? (
          <div>
            <h1 className="text-xl w-full mb-8 font-semibold break-words">
              登録が完了しました！
            </h1>
            <h1 className="text-xl w-full mb-8 font-semibold break-words">
              パートナーを招待しましょう！
            </h1>
            <h1 className="mb-8">{generateInviteLink(inviterId)}</h1>
            <BasicButton
              onClick={() => {
                root.push("/");
              }}
            >
              ホームへ
            </BasicButton>
          </div>
        ) : (
          <BasicButton
            onClick={() => {
              root.push("/");
            }}
          >
            ホームへ
          </BasicButton>
        )}
      </div>
    </div>
  );
};

export default SetProfile;
