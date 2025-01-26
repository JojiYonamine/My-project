interface CustumCheckBoxProps {
  onClick?: () => void;
  checked: boolean | undefined | null;
  text: string;
}

export const CustumCheckBox: React.FC<CustumCheckBoxProps> = ({ onClick, checked,text }) => {
  const disabled:boolean = onClick? false:true
  return (
    <button className="" type="button" onClick={onClick} disabled={disabled}>
      <span 
      className={`w-[50px] h-[30px] rounded-md p-1 border-2 ${checked ? "font-bold bg-pink-100 text-pink-500 border-pink-200" : "border-gray-300 bg-gray-100 text-gray-500"}`}>
        {text}
      </span>
    </button>
  );
};
