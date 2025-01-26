"use client";
import { RequireAuth } from "@/components/RequireAuth";
import Sidebar from "@/components/Sidebar";
import { EditTaskSidebar } from "@/components/Task/editSidebar/EditTaskSidebar";
import { TaskHeader } from "@/components/Task/header/taskHeader";
import { TaskSidebar } from "@/components/Task/sidebar-filter/TaskSIdebar";
import { TaskList } from "@/components/Task/taskList/taskList";
import useAuthStore from "@/Context/authStore";
import useTaskStore from "@/Context/Task/taskStore";
import { useEffect } from "react";

const Task = () => {
  const loading = useAuthStore((state) => state.loading);
  const currentCid = useAuthStore((state) => state.currentCid);
  const initializeTask = useTaskStore((state) => state.initializeTask);

  // タスクを取得する
  useEffect(() => {
    if (loading || !currentCid) {
      return;
    }
    console.log("タスク、リスナー開始");
    const unsubcribe = initializeTask(currentCid);
    return () => {
      unsubcribe();
      console.log("タスク、リスナー解除");
    };
  }, []);

  return (
    <RequireAuth>
      <div className="flex">
        {/* サイドバー、フィルターを表示する */}
        <Sidebar />

        <TaskSidebar />
        <div className="flex flex-col w-full">
          <TaskHeader/>
          <div className="flex h-full w-full ">
            <TaskList/>
            {/* <EditTaskSidebar isEdit={true}/> */}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Task;
