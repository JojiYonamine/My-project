import { setDoc } from "firebase/firestore"
import { coupleRef, userRef} from "../others/firestoreRefs"

// １、両者のIDからカップルを生成する。２、両者に、CID、お互いのIDを付与
export const RegisterCouple = async(inviterId:string,invitedId:string) =>{
    const cid:string = inviterId+invitedId
    try{
        await setDoc(coupleRef(cid),{
            cid:cid,
            partner1_id: inviterId,
            partner2_id: invitedId,
            createdAt: new Date(),
        })
        await setDoc(userRef(inviterId),{
            cid:cid,
            partnerId:invitedId
        },{merge:true})
        await setDoc(userRef(invitedId),{
            cid:cid,
            partnerId:inviterId
        },{merge:true})
    }catch(err:unknown){
        alert("エラー")
        console.error(err,"エラー発生")
    }
} 