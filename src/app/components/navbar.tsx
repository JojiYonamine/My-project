import Link from "next/link";

export default function Navbar() {
    return (
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">ホーム</Link>
          </li>
          <li>
            <Link href='/Auth/Signup'>signup</Link>
          </li>
          <li>
          <Link href='/Auth/Login'>login</Link>
          </li>
          <li>
          <Link href='/Auth/Check'>check the state / logout</Link>
          </li>
          <li>
          <Link href='/Chat'>chat</Link>
          </li>
          <li>
          <Link href='/Test'>test</Link>
          </li>
        </ul>
      </nav>
    );
  }

