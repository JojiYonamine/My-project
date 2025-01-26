// 送信用のボタン
interface MySubmitButtonProps {
    disabled:boolean,
    text:string
}

export const MySubmitButton:React.FC<MySubmitButtonProps> = ({disabled,text}) => {
    return(
        <button
        disabled={disabled}
        className={`px-6 py-2 mx-1 rounded-md font-bold border ${
          disabled
            ? "border-gray-200 text-gray-400"
            : "bg-pink-400  text-white border-pink-400 duration-500 hover:bg-pink-600"
        }`}
        type="submit"
      >
        {text}
      </button>
    )
}