interface inputFieldBoldProps {
  value: string|number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?:string
  name?:string
  type?:string
  // 大きさを指定したい時に用いる
  size?:string
  justifyText?:string
}

export const InputFieldBold: React.FC<inputFieldBoldProps> = ({ value, onChange, placeholder,name,type="text",size,justifyText }) => {
  const className = size?`${size} bg-gray-100 px-2 pt-2 rounded-md`:"bg-gray-100 px-2 pt-2 rounded-md"

  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder||""}
        value={value}
        name={name}
        onChange={(e)=>onChange(e)}
        className={`${justifyText} w-full focus:outline-none bg-gray-100 px-1  focus:font-bold border-b-2 pb-1 border-gray-100 focus:border-pink-500`}
      />
    </div>
  );
};
