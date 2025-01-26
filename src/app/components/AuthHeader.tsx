import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AuthHeaderProps {
  page: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ page }) => {
  const splitedPath = page.split("?");
  const LoginOrSignUp = splitedPath[0].split("/")[2];
  return (
    <header className="bg-pink-400 flex justify-center">
      <div className="bg-pink-400  container flex justify-between items-center py-[20px]">
        {/* ロゴ用 */}
        <div className="flex items-center space-x-2">
          <Image src="/logo1.png" alt="Logo" width={40} height={40} />
          <span className="text-xl font-mono text-white">MyApp</span>
        </div>

        {/* ログイン・サインイン用 */}
        <nav className="flex space-x-2 mx-2">
          <Link
            href={page}
            className="bg-pink-300 text-white font-bold px-4 py-2 rounded-3xl"
          >
            {LoginOrSignUp}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default AuthHeader;
