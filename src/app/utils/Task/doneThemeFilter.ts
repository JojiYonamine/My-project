import useTaskStore from "@/Context/taskStore";
import { Task } from "@/types/taskTypes";

export const useFilter = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const selectedThemes = useTaskStore((state) => state.selectedThemes);
  const criterion = useTaskStore((state) => state.doneCriterion);
  const doneThemeFilter = (): Task[] => {
    switch (criterion) {
      case "done":
        const doneTasks = tasks.filter((task: Task) => task.done);
        return doneTasks.filter((doneTask: Task) =>
          selectedThemes.includes(doneTask.theme)
        );
      case "undone":
        const undoneTasks = tasks.filter((task: Task) => !task.done);
        return undoneTasks.filter((undoneTask: Task) =>
          selectedThemes.includes(undoneTask.theme)
        );
      case "all":
        return tasks.filter((task: Task) =>
          selectedThemes.includes(task.theme)
        );
      default:
        return tasks;
    }
  };
  const filteredTasks = doneThemeFilter();
  return filteredTasks;
};
