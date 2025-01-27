// import useTaskOtherStore from "@/Context/Task/taskOtherStore";
// import useTaskStore from "@/Context/Task/taskStore";
// import useTaskThemeStore from "@/Context/Task/taskThemeStore";
// import { Task } from "@/types/taskTypes";

// export const useFilter = () => {
//   const tasks = useTaskStore((state) => state.tasks);
//   const selectedThemes = useTaskThemeStore((state) => state.selectedThemes);
//   const criterion = useTaskOtherStore((state) => state.doneCriterion);
//   const doneThemeFilter = (): Task[] => {
//     switch (criterion) {
//       case "done":
//         const doneTasks = tasks.filter((task: Task) => task.done);
//         return doneTasks.filter((doneTask: Task) =>
//           selectedThemes.includes(doneTask.theme)
//         );
//       case "undone":
//         const undoneTasks = tasks.filter((task: Task) => !task.done);
//         return undoneTasks.filter((undoneTask: Task) =>
//           selectedThemes.includes(undoneTask.theme)
//         );
//       case "all":
//         return tasks.filter((task: Task) =>
//           selectedThemes.includes(task.theme)
//         );
//       default:
//         return tasks;
//     }
//   };
//   const filteredTasks = doneThemeFilter();
//   return filteredTasks;
// };
