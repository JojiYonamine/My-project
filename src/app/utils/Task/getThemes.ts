import { TaskShowing } from "@/types/types";

export const getThemes = (tasks:TaskShowing[]):string[] =>{
    return Array.from(new Set(tasks.map((task:TaskShowing)=>task.theme)))
}