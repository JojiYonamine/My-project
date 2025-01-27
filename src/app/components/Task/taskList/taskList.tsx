// タスクリスト
import { TaskItem } from "./taskItem";
import { CreateTaskBar } from "./createTaskBar";
import { useEffect } from "react";
import useTaskStore from "@/Context/Task/taskStore";
import useAuthStore from "@/Context/authStore";
import useTaskOtherStore from "@/Context/Task/taskOtherStore";
import useTaskThemeStore from "@/Context/Task/taskThemeStore";
import { useFilter } from "@/utils/Task/doneThemeFilter";

export const TaskList = () => {
  const { loading, currentCid } = useAuthStore();
  const tasks = useTaskStore((state)=>state.tasks)
  const initializeTask = useTaskStore((state) => state.initializeTask);
  const filteredTasks = useTaskStore((state) => state.filteredTasks);
  const doneCriterion = useTaskOtherStore((state) => state.doneCriterion);
  const selectedThemes = useTaskThemeStore((state) => state.selectedThemes);
  const updateFilteredTask = useFilter();

  // タスクリスナーの開始・解除
  useEffect(() => {
    if (loading || !currentCid) return;
    const unsubcribe = initializeTask(currentCid);
    console.log("タスク、リスナー開始");
    return () => {
      unsubcribe();
      console.log("タスク、リスナー解除");
    };
  }, [currentCid]);


  useEffect(() => {
    updateFilteredTask();
  }, [tasks,selectedThemes, doneCriterion]);

  return (
    <div className="h-fit w-full max-h-[80vh] flex flex-col">
      <CreateTaskBar />
      {!filteredTasks ? (
        <h1>タスクがありません！作ってください！</h1>
      ) : (
        <div>
          {filteredTasks.map((task) => (
            <TaskItem task={task} key={task.taskId} />
          ))}
        </div>
      )}
    </div>
  );
};
