// チェックボックス
import { FaRegCheckCircle } from "react-icons/fa";

interface BasicCheckBoxProps {
    onClick:()=>void;
    checked:boolean|undefined|null
}

export const BasicCheckBox:React.FC<BasicCheckBoxProps> = ({onClick,checked}) => {
  return (
    <button type="button" onClick={onClick}>
      <FaRegCheckCircle
        size={30}
        className={`${
          checked ? "text-pink-500" : "text-gray-500"
        }`}
      />
    </button>
  );
};
