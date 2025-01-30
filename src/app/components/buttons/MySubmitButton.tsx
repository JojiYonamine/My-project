import { Spinner } from "../loadingSpinner"

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

interface MySubmitButtonWithSpinnerProps extends MySubmitButtonProps{
  loading:boolean
  color:string
  onClick?:()=>void
}

export const MySubmitButtonWithSpinner:React.FC<MySubmitButtonWithSpinnerProps>=({disabled,text,loading,color,onClick}) => {
  const className = 
  loading?"bg-pink-400 border-pink-400":"border-gray-200 text-gray-400"
  return(

    <button
    disabled={disabled}
    className={`px-6 py-2 w-full mx-1 rounded-md font-bold border flex justify-center ${
      disabled
        ? className
        : "bg-pink-400  text-white border-pink-400 duration-500 hover:bg-pink-600"
    }`}
    type="submit"
    onClick={onClick||undefined}
  >
    {loading?(
      <Spinner size={20} color={color}/>
    ):text}
  </button>
  )
}