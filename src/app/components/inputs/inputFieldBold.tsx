interface inputFieldBoldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?:string
  name?:string
  type?:string
}

export const InputFieldBold: React.FC<inputFieldBoldProps> = ({ value, onChange, placeholder,name,type="text" }) => {

  return (
    <div className="bg-gray-100 px-2 pt-2 rounded-md ">
      <input
        type={type}
        placeholder={placeholder||""}
        value={value}
        name={name}
        onChange={(e)=>onChange(e)}
        className="w-full focus:outline-none bg-gray-100 px-1  focus:font-bold border-b-2 pb-1 border-gray-100 focus:border-pink-500"
      />
    </div>
  );
};
