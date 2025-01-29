import { BiShow } from "react-icons/bi";

interface inputFieldBoldWithShowProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  type?:string;
  onClick: () => void;
}

export const InputFieldBoldWithShow: React.FC<inputFieldBoldWithShowProps> = ({
  value,
  onChange,
  placeholder,
  name,
  onClick,
  type="text"
}) => {
  return (
    <div className="relative bg-gray-100 px-2 pt-2 rounded-md ">
      <input
        type={type}
        placeholder={placeholder || ""}
        value={value}
        name={name}
        onChange={(e) => onChange(e)}
        className="w-full focus:outline-none bg-gray-100 px-1  focus:font-bold border-b-2 pb-1 border-gray-100 focus:border-pink-500"
      />
      <button
        type="button"
        onClick={onClick}
        className="absolute p-[1px] right-3 top-1/2 -translate-y-1/2 bg-gray-400 hover:bg-pink-500 rounded-full duration-300 "
      >
      
        <BiShow size={15} className="text-white" />
      </button>
    </div>
  );
};
