import { auth } from "@/config/firebaseConfig"
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export const loginWithGoogle = async(inviterId:string|null) =>{
    const provider = new GoogleAuthProvider()
    try {
        const result = await signInWithPopup(auth,provider)
        if(result){
            const identifier = getAdditionalUserInfo(result)?.isNewUser
            // 新規の時
            if(identifier==true){
                if(inviterId){
                    window.location.href=`/Auth/setProfile?inviterId=${inviterId}`
                }else{
                    window.location.href='/Auth/setProfile'
                }
            }
        }
    } catch (err:unknown) {
        console.log(err,"Google失敗")
    }
}