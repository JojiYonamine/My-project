import useTaskThemeStore from "@/Context/Task/taskThemeStore"
import { Task, TaskTheme } from "@/types/taskTypes"

export const useGetTheme = () => {
    const themes = useTaskThemeStore((state)=>state.taskThemes)
    const getTheme = (task:Task):TaskTheme => {
       const theme:TaskTheme = themes.filter((theme)=>theme.taskThemeId === task.themeId)[0]
       return theme
    }
    return getTheme
}