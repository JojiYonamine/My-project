import { MySubmitButton } from "@/components/buttons/MySubmitButton";
import { InputDate } from "@/components/inputs/inputDate";
import { InputFieldBold } from "@/components/inputs/inputFieldBold";
import useAuthStore from "@/Context/authStore";
import { Task } from "@/types/taskTypes";
import { useEditObject } from "@/utils/others/editObject";
import { useEditBoolean } from "@/utils/others/editObjectBoolean";
import { validateTask } from "@/utils/Task/validateTask";
import { useState } from "react";
import { SelectTheme } from "./selectTheme";
import { useTask } from "@/utils/Task/taskHandler";
import { CustumCheckBox } from "@/components/buttons/custumCheckBox";
import useTaskStore from "@/Context/Task/taskStore";

export const CreateTaskBar: React.FC = () => {
  const currentUser = useAuthStore((state) => state.currentUser)!;
  const newTask: Task = {
    title: "",
    createdBy: currentUser.uid,
    createdAt: new Date(),
    themeId: "",
    share: false,
    done: false,
    dueDate: null,
    description: null,
  };
  const [task, setTask] = useState<Task>(newTask);
  const [due, setDue] = useState<boolean>(false);
  const editTask = useEditObject(task, setTask);
  const toggleDue = useEditBoolean(due, setDue);
  const toggleShare = useEditBoolean(task, setTask, "share");
  const uploadTask = useTask();
  const setEditingTask = useTaskStore((state) => state.setEditingTask);

  // 期日有無を変更する関数
  const checkboxFunc = () => {
    const newDate = new Date();
    toggleDue();
    const newDue = task.dueDate ? null : newDate;
    setTask({ ...task, dueDate: newDue });
  };
  // バリデーションを行う関数
  const validate = (): boolean => {
    const errors = validateTask(task);
    if (errors.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  // タスク送信時に実行する関数
  const handleSubmitTask = () => {
    setEditingTask(task);
    uploadTask("create", task);
    setTask(newTask);
  };

  const setDate = (date:Date) => {
    setTask({...task,dueDate:date})
  }
  return (
    <div className="w-full bg-gray-100 ">
      <form
        className="flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitTask();
        }}
      >
        {/* タイトル */}
        <div className="overflow-hidden w-[200px]">
          <InputFieldBold value={task.title} onChange={(e) => editTask(e)} placeholder="タイトルを入力" name="title" />
        </div>

        {/* テーマ選択 */}
        <div className="border-pink-300 rounded-md border-2 overflow-hidden  w-[150px]">
          <SelectTheme task={task} setTask={setTask} />
        </div>

        {/* 期日の有無・決定 */}
        <div className="flex">
          <CustumCheckBox onClick={() => checkboxFunc()} checked={due} text="期日" />
          {due && <InputDate date={task.dueDate} setDate={setDate}/>}
        </div>

        {/* 共有・送信ボタン */}
        <div className="flex justify-end grow">
          <div className="flex items-center">
            <CustumCheckBox onClick={() => toggleShare()} checked={task.share} text="共有" />
          </div>
          <MySubmitButton text="作成" disabled={validate()} />
        </div>
      </form>
    </div>
  );
};
