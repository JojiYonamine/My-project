// components/Button.jsx
import React from "react";
interface BasicButtonProps {
  onClick?: () => void|Promise<void>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  // disabledした時の色などのコンディション
  disabledClassName?: string;
  text: string;
  size?:string
}

const BasicButton: React.FC<BasicButtonProps> = ({
  onClick,
  type = "button",
  disabled = false,
  text,
  disabledClassName = "bg-pink-400 text-gray-300",
  size,
}) => {
  const basicDiabledClassName = disabled ? disabledClassName : "bg-pink-400 text-white hover:bg-pink-500";
  return (
    <button
      type={type}
      className={`p-2 rounded-lg focus:outline-none transition duration-500  font-semibold 
           ${basicDiabledClassName} ${size||"w-full"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BasicButton;
