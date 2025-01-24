import { Task } from "@/types/taskTypes"

export const getThemes = (tasks:Task[]):string[] =>{
    return Array.from(new Set(tasks.map((task:Task)=>task.themeId)))
}