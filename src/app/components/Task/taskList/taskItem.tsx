// タスクリストに表示するタスク
import { BasicCheckBox } from "@/components/buttons/basicCheckBox";
import { InputFieldBold } from "@/components/inputs/inputFieldBold";
import useTaskStore from "@/Context/Task/taskStore";
import { Task } from "@/types/taskTypes";
import { dateToIso } from "@/utils/others/dateUtils";
import { useEditObject } from "@/utils/others/editObject";
import { useGetTheme } from "@/utils/Task/getThemeObject";
import { useTask } from "@/utils/Task/taskHandler";
import { SelectTheme } from "./selectTheme";
import { CustumCheckBox } from "@/components/buttons/custumCheckBox";
import { InputDate } from "@/components/inputs/inputDate";
import { CancelButton } from "@/components/buttons/cancelButton";
import SubmitButton from "@/components/buttons/SubmitButton";
import { MySubmitButton } from "@/components/buttons/MySubmitButton";
import { validateTask } from "@/utils/Task/validateTask";
import { useEditBoolean } from "@/utils/others/editObjectBoolean";

interface taskItemProps {
  task: Task;
}

export const TaskItem: React.FC<taskItemProps> = ({ task }) => {
  const editingTask = useTaskStore((state) => state.editingTask);
  const setEditngTask = useTaskStore((state) => state.setEditingTask);
  const uploadTask = useTask();
  const editTask = useEditObject(editingTask, setEditngTask);
  const getTheme = useGetTheme();
  const theme = getTheme(task);
  const isEditing: boolean = task.taskId === editingTask?.taskId ? true : false;
  const checkboxFunc = () => {
    if (!editingTask) return;
    const newDate: Date = task.dueDate || new Date();
    const newDue = editingTask?.dueDate ? null : newDate;
    setEditngTask({ ...editingTask, dueDate: newDue });
  };

  const validate = (): boolean => {
    if (!editingTask) return false;
    const errors = validateTask(editingTask);
    if (errors.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const toggleShare = useEditBoolean(editingTask,setEditngTask,"share")
  return (
    <div>
      {isEditing && editingTask ? (
        <form className="flex w-full items-center justify-between border-2 rounded-md p-1 h-[50px]"
        onSubmit={(e)=>{
          e.preventDefault()
          uploadTask("edit",editingTask)
        }}
        >
          <div className="overflow-hidden w-[200px]">
            <InputFieldBold onChange={(e) => editTask(e)} value={editingTask!.title} name="title" />
          </div>

          {/* テーマ選択 */}
          <div className="border-pink-300 rounded-md border-2 overflow-hidden  w-[150px]">
            <SelectTheme task={editingTask!} setTask={setEditngTask} />
          </div>

          <div className="flex">
            <CustumCheckBox onClick={() => checkboxFunc()} checked={editingTask?.dueDate ? true : false} text="期日" />
            {typeof editingTask.dueDate === "object" && (
              <InputDate obj={editingTask} setObj={setEditngTask} dateKey="dueDate" />
            )}
          </div>

          <CustumCheckBox onClick={() => toggleShare()} checked={editingTask.share} text="共有" />

          <div className="flex justify-end grow">
            <MySubmitButton disabled={validate()} text="変更" />
          </div>
        </form>


      ) : (
        <div className="flex w-full items-center border-2 rounded-md p-1 h-[50px]">
          <BasicCheckBox
            checked={task.done}
            onClick={() => {
              uploadTask("complete", task);
            }}
          />
          <span className="font-bold p-1 mx-2 overflow-hidden max-w-md"> {task.title}</span>
          <span
            className="w-[150px] overflow-hidden max-h-[30px] rounded-md p-1 text-center items-center"
            style={{ backgroundColor: theme.color }}
          >
            {theme.name}
          </span>
          <CustumCheckBox checked={task.share} text="共有" />
          {task.dueDate && <span className="text-gray-500 font-bold mx-2">{dateToIso(task.dueDate)}</span>}

          <div className="flex grow items-center justify-end">
            <button
              onClick={() => {
                setEditngTask(task);
              }}
            >
              編集
            </button>
            <button
              onClick={() => {
                uploadTask("delete", task);
              }}
            >
              削除
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
