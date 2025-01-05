interface PasswordChecklistProps {
    conditions: { label: string; isValid: boolean }[];
  }
  
  export const PasswordChecklist: React.FC<PasswordChecklistProps> = ({
    conditions,
  }) => {
    return (
      <ul className="list-disc pl-5 text-sm text-gray-500">
        {conditions.map((condition, index) => (
          <li
            key={index}
            className={condition.isValid ? "text-green-500" : "text-red-500"}
          >
            {condition.label}
          </li>
        ))}
      </ul>
    );
  };
  