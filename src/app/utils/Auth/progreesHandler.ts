// プロフィール設定の進行を行う関数

import useSignStore from "@/Context/signStore";

export const useProgress = () => {
  const progress = useSignStore((state) => state.progress);
  const setProgress = useSignStore((state) => state.setProgress);
  const handleNext = () => {
    if (progress == "name") setProgress("icon");
    else if (progress == "icon") setProgress("birthDay");
  };
  const handleBack = () => {
    if (progress == "icon") setProgress("name");
    else if (progress == "birthDay") setProgress("icon");
  };
  return {handleNext,handleBack}
};
