// チェックボックス
import { FaRegCheckCircle } from "react-icons/fa";

interface BasicCheckBoxProps {
    onClick?:()=>void;
    checked:boolean|undefined|null;
    disbaled?:boolean
    size?:number
}

export const BasicCheckBox:React.FC<BasicCheckBoxProps> = ({onClick,checked,size=30,disbaled=false}) => {
  return (
    <button disabled={disbaled} type="button" onClick={onClick?() => onClick() : undefined}>
      <FaRegCheckCircle
        size={size}
        className={`${
          checked ? "text-pink-500" : "text-gray-500"
        }`}
      />
    </button>
  );
};
