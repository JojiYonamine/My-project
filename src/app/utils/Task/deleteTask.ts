import { deleteDoc } from "firebase/firestore"
import { taskRef } from "../firestoreRefs"
import { TaskShowing } from "@/types/types"

export const deleteTask = async (cid:string,task:TaskShowing) => {
    try{
        await deleteDoc(taskRef(cid,task.taskId))
        alert(`${task.title}を削除しました`)
    }catch(err:unknown){
        console.error("エラーが発生",err)
    }

}