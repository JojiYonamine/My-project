import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

interface SpinnerProps {
  size: number;
}

interface SpinnerWithIconProps extends SpinnerProps {
  loading: boolean;
  icon?: string|null;
}

interface LoadingSpinnerWithContentProps extends SpinnerProps {
  content: React.ReactNode;
  loading?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({ size }) => {
  const iconSize = size * 0.65;
  return (
    <div
      className={`relative flex items-center justify-center`}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      {/* 回転 */}
      <div
        className={`
            animate-spin z-0 rounded-full border-t-transparent
            border-4 border-pink-400`}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
      {/* ユーザーなしアイコン */}
      <FaUser
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      "
        size={iconSize}
      />
      {/* <Image className="absolute inset-0 top-0 w-full h-full" src="/icons/icon-no-user.png" alt="not found" height={5} width={5}/> */}
    </div>
  );
};

// アイコン用
export const SpinnerWithIcon: React.FC<SpinnerWithIconProps> = (
  { size, loading = true,  icon 
  },
) => {
  const iconSize = size * 0.65;
  if(!icon){
    icon = "/icons/icon-no-user.png"
  }
  return (
    <div className="flex items-center justify-center">
      {loading ? (
        <div
          className={`relative flex items-center justify-center`}
          style={{ height: `${size}px`, width: `${size}px` }}
        >
          <div
            className={`
            animate-spin z-0 rounded-full border-t-transparent
            border-2 border-pink-400`}
            style={{ height: `${size}px`, width: `${size}px` }}
          />
          <FaUser
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            size={iconSize}
          />
        </div>
      ) : (
        <div
          className={`relative flex items-center justify-center`}
          style={{ height: `${size}px`, width: `${size}px` }}
        >
          <Image
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src={icon}
            alt="not found"
            height={size}
            width={size}
          />
        </div>
      )}
    </div>
  );
};

// export const LoadingSpinnerWithContent: React.FC<
//   LoadingSpinnerWithContentProps
// > = ({
//   size = 10,
//   color = "pink-500",
//   content = <div> no content </div>,
//   loading = true,
// }) => {
//   return (
//     <div>
//       {loading ? (
//         <Spinner size={size} color={color} />
//       ) : (
//         <div className={`h-{size} w-{size}`}>{content}</div>
//       )}
//     </div>
//   );
// };
