"use client"
import { db } from "@/config/firebaseConfig"
import { useCouple } from "@/Context/Couple-modified"
import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"

//ログイン、カップル登録していないと出てこないようにする。
//カップル登録してないユーザーが入れないようにしないとダメ
//一応、cidなしっ弾くようにするか

const Chat = () => {
    //チャットルーム作成関数 ルーム名、CIDを必要とする。
    //console.log(CoupleId)
    const CoupleId = useCouple().coupleId
    const[roomName,setRoomName] = useState<string>('')


    const CreateChatRoom =async (name:string|null) => {
        if (!CoupleId){
            console.log("you need to make couple to create chat room")
        }else{
            if (!name){
                console.log("you need to decide name")
            }else{
                try{
                    const docRef = doc(db, "chatRooms",name);
                    await setDoc(docRef,{
                        name:name,
                        cid:CoupleId
                    });
                    console.log(`created the room name:${name} cid:${CoupleId}`)
                    setRoomName("")
                }catch(err:unknown){
                    console.error("エラーが発生",err)
                }
            }
            }}




    

    return(
        <div>
            <form onSubmit={(e:React.FormEvent<HTMLFormElement>) => {e.preventDefault();{CreateChatRoom(roomName)}}}>
                <input value={roomName} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setRoomName(e.target.value)}} placeholder="ルーム名を入力"/>
                    <button type="submit">送信</button>
            </form>
        </div>
    )
}
export default Chat