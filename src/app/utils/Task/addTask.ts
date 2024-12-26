import { internalTask } from "@/types/types";
import { addDoc } from "firebase/firestore";
import { tasksRef } from "../firestoreRefs";

export const addTask = async (cid:string,task:internalTask) => {
    if(!task.title.trim()){
        alert("titleを入力")
        return
    }
    if(!task.theme){
        const newTask = {...task,theme:"テーマなし"}
        try{
            await addDoc(tasksRef(cid),newTask)
            alert(`${newTask.title}を登録しました`)
        }catch(err:unknown){
            console.error("エラー",err)
        }
        return
    }

    try{
        await addDoc(tasksRef(cid),task)
        alert(`${task.title}を登録しました`)
    }catch(err:unknown){
        console.error("エラー",err)
    }
}