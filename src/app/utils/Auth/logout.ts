import { Auth, signOut } from "firebase/auth"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"

export const Logout = async (auth:Auth,root:AppRouterInstance) =>{
    try{
        await signOut(auth)
        alert("ログアウトしました")
        root.push("/Auth/Login")
    }catch(err:unknown){
        console.log(err)
        alert("ログアウトに失敗しました")
    }
}