import { TaskTheme } from "@/types/taskTypes";

export const validateTheme = (theme:TaskTheme|null):string[] =>{
    const errors:string[] = []
    if(!theme){
        errors.push("テーマを選んでください")
        return errors
    }
    if(theme?.name.trim().length == 0){
        errors.push("テーマ名を入力して下さい")
    }
    return errors
}