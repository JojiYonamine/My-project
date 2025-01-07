import { auth } from "@/config/firebaseConfig"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export const loginWithGoogle = async(inviterId:string|null) =>{
    const provider = new GoogleAuthProvider()
    try {
        const result = await signInWithPopup(auth,provider)
        if(result){
            const user = result.user
            console.log("Google成功",user.email,user.displayName)
            if(inviterId){
                window.location.href=`/Auth/setProfile?inviterId=${inviterId}`
            }else{
                window.location.href='/Auth/setProfile'
            }
        }

    } catch (err:unknown) {
        console.log(err,"Google失敗")
    }
}