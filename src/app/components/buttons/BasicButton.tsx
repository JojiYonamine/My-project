// components/Button.jsx
import React, { ReactNode } from "react";
interface BasicButtonProps {
  children?:ReactNode;
  onClick?:()=>void;
  type?:"button"|"submit"|"reset"
  variant?:"primary" |"error"; 
  disabled?:boolean
}

const BasicButton:React.FC<BasicButtonProps> = ({ children, onClick, type = "submit",disabled=false}) => {
  const baseStyles = "mb-8 py-2 w-full rounded-lg font-semibold focus:outline-none transition duration-500";
  const variants = {
    primary: "bg-pink-400 text-white hover:bg-pink-500",
    error: "bg-pink-400 text-gray-300",
  };

  return (
    <button
      type={type}
      className={!disabled?(`${baseStyles} ${variants["primary"]}`):(`${baseStyles} ${variants["error"]}`)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BasicButton