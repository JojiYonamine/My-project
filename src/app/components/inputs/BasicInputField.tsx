// components/InputField.jsx
import React from "react";
interface BasicInputFieldProps {
    label?:string;
    value?:string
    onChange?:()=>void
}

const BasicInputField = ({ label, value, onChange }:BasicInputFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        type='text'
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default BasicInputField;
