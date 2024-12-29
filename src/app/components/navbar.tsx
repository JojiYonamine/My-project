"use client"
import { useCouple } from "@/Context/Couple-modified";
import Link from "next/link";

export default function Navbar() {
  const {user,cid: coupleId, loading} = useCouple();
    return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
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
          <Link href='/Calendar'>Calendar</Link>
          </li>
          <li>
          <Link href='/Tasks'>Task</Link>
          </li>
          <li>
          <Link href='/Test'>test</Link>
          </li>
        </ul>
        <div>
        <div>
          {loading?(<p>ロード中</p>):user?(<p>ログイン中:{user.email}</p>):(<p>未ログイン</p>)}
          </div>
          <div>
          {coupleId?(<p>{coupleId}</p>):(<p>カップルを登録してください</p>)}
          </div>
        </div>
        </div>
        
      </nav>
    );
  }

