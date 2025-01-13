import useAuthStore from "@/Context/authStore";
import { CreateChatRoom } from "@/utils/Chat/CreateChatRoom";
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

interface CreateRoomButton {
  className?: string;
}

export const CreateRoomButton: React.FC<CreateRoomButton> = ({ className }) => {
  console.log("create room button rendered");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");
  const toggeleModal = () =>{
    openModal?setOpenModal(false):setOpenModal(true)
  }
  // カップル存在する時のみアクセスできるので！でおけかな
  const cid: string = useAuthStore((state) => state.currentCid)!;
  return (
    <div className={className}>
      <button onClick={()=>toggeleModal()} className="flex items-center justify-center">
        <FaCirclePlus
          className="rounded-full bg-white text-pink-300"
          size={25}
        />
      </button>
      {openModal && (
        //モーダル
        <form
          className="ralative w-60 h-60 rounded-2xl 
          flex flex-col items-center justify-center
          bg-white border border-gray-50 shadow-xl
          absolute top-10
          z-10"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            CreateChatRoom(cid, roomName);
            setRoomName("");
            setOpenModal(false);
          }}
        >
          <h1 className="absolute top-0 mt-3 font-bold ">ルーム作成</h1>
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="absolute top-0 right-0 mr-2 mt-2
            bg-pink-300 rounded-full"
          >
            <IoIosClose size={30} className="text-white" />
          </button>
          <input
            value={roomName}
            className="w-full"
            placeholder="ルーム名を入力"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRoomName(e.target.value);
            }}
          />
          <button type="submit">送信!</button>
        </form>
      )}
    </div>
  );
};
