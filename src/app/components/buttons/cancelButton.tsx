// キャンセルボタン
interface CancelButtonProps {
  onClick: () => void;
}

export const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`px-2 py-2 mx-1 rounded-md border border-gray-200 text-gray-400 font-semibold tex duration-500 hover:text-gray-500 hover:bg-gray-300`}
      type="button"
    >
      キャンセル
    </button>
  );
};
