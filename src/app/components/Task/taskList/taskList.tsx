// タスクリスト

import { useFilter } from "@/utils/Task/doneThemeFilter";
import { TaskItem } from "./task";

export const TaskList = () => {
  const filteredTasks = useFilter();

  return (
    <div className="h-screen">
      <h1>タスクリスト</h1>
      {filteredTasks.map((task) => (
        <TaskItem task={task} key={task.taskId}/>
      ))}
    </div>
  );
};
