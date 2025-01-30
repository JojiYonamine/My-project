// components/Button.jsx
import React from "react";
interface BasicButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  text: string;
}

const BasicButton: React.FC<BasicButtonProps> = ({ onClick, type = "button", disabled = false, text }) => {

  return (
    <button
      type={type}
      className={`p-2 w-full rounded-lg focus:outline-none transition duration-500  font-semibold 
        ${disabled ? "bg-pink-400 text-gray-300" : "bg-pink-400 text-white hover:bg-pink-500"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BasicButton;
