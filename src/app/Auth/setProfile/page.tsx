// ！！！注意！！！
// inviterIdは、リンク生成用
// InviterIdは、リンク経由での登録

"use client";
import { BasicButton } from "@/components";
import { RequireAuth } from "@/components/RequireAuth";
import { auth } from "@/config/firebaseConfig";
import useAuthStore from "@/Context/authStore";
import { useRegisterCouple } from "@/utils/Auth/registerCouple";
import { IsoToDate } from "@/utils/others/dateUtils";
import { getUserNameFromFirestore, userRef } from "@/utils/others/firestoreRefs";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const SetProfile = () => {
  type progress = "name" | "icon" | "birthDay" | "completed";
  const [progress, setProgress] = useState<progress>("name");
  const [name, setName] = useState<string>("");
  const [icon, setICon] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");
  const [inviterId, setInviterId] = useState<string>("");
  // const [user,setUser] = useState<User|null>(null)
  const root = useRouter();
  const [inviterName, setInviterName] = useState<string>("");
  const [invitedName, setInvitedName] = useState<string>("");
  // trueでロード中
  const [gettingName, setGettingName] = useState<boolean>(true);

  const user = useAuthStore((state) => state.currentUser);
  const loading = useAuthStore((state) => state.loading);
  // const initializeAuthListener = useAuthStore((state) => state.initializeAuthListener);

  const icons = Array.from({ length: 12 }, (_, i) => `/icons/icon${i + 1}.png`);

  const searchParams = useSearchParams();
  const InviterId = searchParams.get("inviterId");

  const registerCouple = useRegisterCouple();

  // Google経由の時名前自動入力
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user && user.providerData?.length > 0) {
        const displayName = user.providerData[0].displayName || "";
        setName(displayName);
      }
      return () => unsubcribe();
    });
  }, []);

  useEffect(() => {
    if (loading || !user) {
      console.log("no user or now loading");
      return;
    } else {
      if (!InviterId) return;
      registerCouple(InviterId, user.uid);
    }
  }, []);

  const registerUserProfile = async (user: User, birthDay: string) => {
    try {
      await setDoc(
        userRef(user.uid),
        {
          name: user.displayName || "Anonymous",
          email: user.email,
          birthDay: IsoToDate(birthDay),
          createdAt: new Date(),
        },
        { merge: true }
      );
      console.log("User registered in Firestore!");
    } catch (err: unknown) {
      alert(err);
    }
  };

  //   最終的に登録ボタンを押した時に使用する
  const handleUpadateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      if (!InviterId) {
        setInviterId(user.uid);
      }
      // setName("");
      setICon("");
      setBirthDay("");
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

  const getUserName = async () => {
    if (!user || !InviterId) {
      return;
    }
    const InviterName: string = await getUserNameFromFirestore(InviterId);
    const InvitedName: string = await getUserNameFromFirestore(user.uid);
    setInviterName(InviterName);
    setInvitedName(name);
    console.log(`inviter:${InviterName},invited:${InvitedName}`);
    setGettingName(false);
  };

  return (
    // ページ表示
    <div className="h-screen flex justify-center text-center items-center">
      {/* カード表示 */}
      <div className="bg-white rounded p-6 w-11/12 sm:mt-0  max-w-lg border border-gray-300">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            handleUpadateProfile(e);
            getUserName();
          }}
        >
          {/* 名前 */}
          {progress == "name" && (
            <div>
              <h1 className="text-xl w-full mb-8 font-semibold break-words">ニックネームを決めてください！</h1>
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
              <h1 className="text-lg sm:tex-xl w-full mb-8 font-bold">アイコンを決めてください</h1>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {icons.map((path, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectIcon(path)}
                    className={`flex justify-center items-center cursor-pointer border-4 hover:border-pink-500 rounded-lg
                      ${path == icon ? "border-pink-500" : "border:gray-500"}`}
                  >
                    <Image
                      src={path}
                      width={60}
                      height={60}
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
                <BasicButton onClick={handleNext} disabled={!icon}>
                  次へ
                </BasicButton>
              </div>
            </div>
          )}

          {/* 誕生日 */}
          {progress == "birthDay" && (
            <div className="relative">
              <h1 className="text-xl w-full mb-8 font-bold">誕生日を入力してください</h1>
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
                <BasicButton type="submit" disabled={!birthDay}>
                  登録
                </BasicButton>
              </div>
            </div>
          )}
          {/* 招待 */}
          {!InviterId && progress == "completed" && (
            <div>
              <h1 className="text-xl w-full mb-8 font-semibold break-words">登録が完了しました！</h1>
              <h1 className="text-xl w-full mb-8 font-semibold break-words">パートナーを招待しましょう！</h1>
              <h1 className="mb-8">{generateInviteLink(inviterId)}</h1>
              <BasicButton
                type="button"
                onClick={() => {
                  root.push("/");
                }}
              >
                ホームへ
              </BasicButton>
            </div>
          )}
          {progress == "completed" && InviterId && (
            <div>
              {gettingName ? (
                <ClipLoader color="#3498db" size={50} />
              ) : (
                <div className="text-center">
                  <h1 className="text-xl w-full mb-8 font-semibold break-words">
                    {`${inviterName}と${invitedName}のカップルを登録しました!`}
                  </h1>
                  <BasicButton
                    type="button"
                    // disabled={true}
                    onClick={() => {
                      root.push("/Calendar");
                    }}
                  >
                    ホームへ
                  </BasicButton>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default function AuthSetProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RequireAuth requireCouple={false}>
        <SetProfile />
      </RequireAuth>
    </Suspense>
  );
}
