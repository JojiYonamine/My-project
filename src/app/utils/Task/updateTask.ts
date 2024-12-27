import { TaskShowing } from "@/types/types";
import { updateDoc } from "firebase/firestore";
import { taskRef } from "../firestoreRefs";

export const updateTask = async (cid:string,editedTask:TaskShowing) => {

    const {taskId,...EditedTask} = editedTask

        if(!editedTask.title.trim()){
            alert("titleを入力")
            return
        }
        if(!editedTask.theme){
            const newTask = {...EditedTask,theme:"テーマなし"}
            try{
                await updateDoc(taskRef(cid,editedTask.taskId),newTask)
                alert(`${newTask.title}を登録しました`)
            }catch(err:unknown){
                console.error("エラー",err)
            }
            return
        }
    
    try{
        await updateDoc(taskRef(cid,editedTask.taskId),EditedTask)
    }catch(err:unknown){
        console.error("エラー",err)
    }
}

export const updateDone = async(cid:string,taskId:string,done:boolean ) => {
    try{
        console.log("done")
        await updateDoc(taskRef(cid,taskId),{done:done})
    }catch(err:unknown){
        console.error("エラー",err)
    }
}