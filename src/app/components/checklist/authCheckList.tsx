import { FaRegCheckCircle } from "react-icons/fa";
import React from "react";

export interface AuthCheckListProps {
  lists: { isValid: boolean; text: string }[];
}

export const AuthCheckList: React.FC<AuthCheckListProps> = ({ lists }) => {
  return (
    <div className="ml-6 mb-8">
      {lists.map((item, index) => (
        <div key={index}>
          {item.isValid ? (
            <div className="flex mb-2 font-bold">
              <FaRegCheckCircle className="h-4 w-4 text-gray-300" />
              <label className="text-xs ml-2 text-gray-400">
                {item.text}
              </label>
            </div>
          ) : (
            <div className="flex mb-2 font-bold">
              <FaRegCheckCircle className="h-4 w-4 text-pink-500" />
              <label className="text-xs ml-2 text-gray-700">
                {item.text}
              </label>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

