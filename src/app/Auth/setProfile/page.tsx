"use client";
import { auth } from "@/config/firebaseConfig";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

const SetProfile = () => {
  type progress = "name" | "icon" | "birthDay";
  const [progress, setProgress] = useState<progress>("name");
  const [name, setName] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [birthDay, setBirthDay] = useState<Date>(new Date());
  const user = auth.currentUser;
  const root = useRouter()
  if(!user){
    root.push('/Auth/Signup')
    return
  }

//   最終的に登録ボタンを押した時に使用する
  const handleUpadateProfile = async () => {
    try {
      await updateProfile(user, { displayName:name, photoURL:photo });
    } catch (err: unknown) {
      alert(err);
    }
  };

  const handleNext = () =>{
    if(progress=="name") setProgress("icon")
    else if(progress=="icon") setProgress('birthDay')
  }

  const handleBack = () =>{
    if(progress=="icon") setProgress('name')
    else if(progress=="birthDay") setProgress('icon')
  }

  return (
    <div className="bg-white rounded-3xl m-8 px-12 py-8 w-full max-w-md">
      {progress == "name" && <div></div>}
      {progress == "icon" && <div></div>}
      {progress == "birthDay" && <div></div>}
    </div>
  );
};

export default SetProfile;
