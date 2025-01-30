import { FaLine, FaInstagram, FaTwitter} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle } from "@/utils/Auth/loginWithGoogle";
import useSignStore from "@/Context/signStore";



export const SocialLoginList = () => {
    const inviterId = useSignStore((state)=>state.inviterId)
  return (
    <div className="space-x-8 flex mb-8 justify-center text-center items-center">
      <button onClick={() => loginWithGoogle(inviterId)}>
        <FcGoogle size={48} />
      </button>
      <button className="bg-blue-500 p-2 rounded-full">
        <FaTwitter size={32} className="text-white" />
      </button>
      <button>
        <FaLine size={48} className="text-green-500" />
      </button>
      <button>
        <FaInstagram size={48} className="text-fuchsia-400" />
      </button>
    </div>
  );
};
