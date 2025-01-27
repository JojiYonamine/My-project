import useTaskOtherStore from "@/Context/Task/taskOtherStore";
import useTaskStore from "@/Context/Task/taskStore";
import useTaskThemeStore from "@/Context/Task/taskThemeStore";
import { Task, TaskTheme } from "@/types/taskTypes";

export const useFilter = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const selectedThemes = useTaskThemeStore((state) => state.selectedThemes);
  const criterion = useTaskOtherStore((state) => state.doneCriterion);
  const setFilteredTasks = useTaskStore((state)=>state.setFilteredTasks)
  const getFilteredTasks = (tasks:Task[],themes:TaskTheme[]):Task[]|null => {
    const filteredTasks = tasks.filter((task)=>
        themes.some((theme)=>theme.taskThemeId === task.themeId)
    )
    return filteredTasks
  }
  const doneThemeFilter = (): Task[]|null => {
    // if(!selectedThemes){
    //     return tasks
    // }
    switch (criterion) {
      case "done":
        const doneTasks = tasks.filter((task: Task) => task.done);
        return getFilteredTasks(doneTasks,selectedThemes)
      case "undone":
        const undoneTasks = tasks.filter((task: Task) => !task.done);
        return getFilteredTasks(undoneTasks,selectedThemes)
      case "all":
        return getFilteredTasks(tasks,selectedThemes)
      default:
        return tasks;
    }
  };
  const updateFilteredTasks = () => {
    const filteredTasks = doneThemeFilter();
    setFilteredTasks(filteredTasks)
  }
  return updateFilteredTasks
};
