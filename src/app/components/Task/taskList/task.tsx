// タスクリストに表示するタスク

import useTaskStore from "@/Context/Task/taskStore";
import { Task } from "@/types/taskTypes";
import { useTask } from "@/utils/Task/taskHandler";

interface taskItemProps {
    task:Task
}

export const TaskItem:React.FC<taskItemProps> = ({task}) => {
    const setEditngTask = useTaskStore((state)=>state.setEditingTask)
    const editTask = useTask(task)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          name={task.taskId}
          onChange={() => {
            editTask('complete')
          }}
        />
      </label>
      {task.title}
      <button
        onClick={() => {
          setEditngTask(task)
        }}
      >
        編集
      </button>
      <button
        onClick={() => {
          editTask("delete");
        }}
      >
        削除
      </button>
    </div>
  );
};
