// タスクリスト

import { useFilter } from "@/utils/Task/doneThemeFilter";
import { TaskItem } from "./taskItem";
import { CreateTaskBar } from "./createTaskBar";
import { useEffect } from "react";
import useTaskStore from "@/Context/Task/taskStore";
import useAuthStore from "@/Context/authStore";

export const TaskList = () => {
  // const filteredTasks = useFilter();
  const tasks = useTaskStore((state)=>state.tasks)
  const { loading, currentCid } = useAuthStore();
  const initializeTask = useTaskStore((state) => state.initializeTask);
  useEffect(() => {
    if (loading || !currentCid) return;
    const unsubcribe = initializeTask(currentCid);
    console.log("タスク、リスナー開始")
    return ()=>{
      unsubcribe()
      console.log("タスク、リスナー解除")
    }
  }, [currentCid]);

  return (
    <div className="h-fit w-full max-h-[80vh] flex flex-col">
      <CreateTaskBar/>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.taskId}/>
      ))}
      
    </div>
  );
};
