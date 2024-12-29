import { internalTask } from "@/types/types";
import { addDoc } from "firebase/firestore";
import { tasksRef } from "../firestoreRefs";

export const addTask = async (cid:string,task:internalTask) => {
    if(!task.title.trim()){
        alert("titleを入力")
        return
    }
    if(!task.theme){
        const newTask:internalTask = {...task,theme:"テーマなし"}
        try{
            const newTaskRef = tasksRef(cid)
            const newId:string = newTaskRef.id
            await addDoc(newTaskRef,newTask)
            alert(`${newTask.title}を登録しました`)
            return newId
        }catch(err:unknown){
            console.error("エラー",err)
        }
        return 
    }

    try{
        const newTaskRef = tasksRef(cid)
        const newId:string = newTaskRef.id
        await addDoc(newTaskRef,task)
        alert(`${task.title}を登録しました`)
        return newId
    }catch(err:unknown){
        console.error("エラー",err)
    }
}