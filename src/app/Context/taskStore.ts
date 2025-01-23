// タスク機能の状態管理用

import { Task } from "@/types/taskTypes";
import { tasksRef } from "@/utils/firestoreRefs";
import { onSnapshot } from "firebase/firestore";
import { create } from "zustand";

type doneCriterion = "all"|"undone"|"done";

interface taskStore {
    tasks:Task[];
    initializeTask:(cid:string) => () => void;
    editingTask:Task|null;
    setEditingTask:(task:Task|null) => void;
    themes:string[];
    setThemes:(themes:string[]) => void;
    selectedThemes:string[];
    setSelectedThemes:(themes:string[]) => void;
    doneCriterion:doneCriterion;
    setDoneCriterion:(criterion:doneCriterion) => void;
    sidebarOpen:boolean;
    setSidebarOpen:(open:boolean)=>void;
    filteredTasks:Task[];
    setFilteredTasks:(tasks:Task[]) => void
}

const useTaskStore = create<taskStore>((set)=>({
    tasks:[],
    initializeTask:(cid)=>{
        const unsubscribe = onSnapshot(tasksRef(cid),(snapshot)=>{
            const tasks:Task[] = snapshot.docs.map((doc)=>({
                taskId:doc.id,
                title:doc.data().title,
                createdBy:doc.data().createdBy,
                createdAt:doc.data().createdAt,
                theme:doc.data().theme,
                dueDate:doc.data().dueDate,
                share:doc.data().share,
                description:doc.data().description,
                done:doc.data().done
            }));
            set({tasks:tasks})
        })
        return unsubscribe
    },
    editingTask:null,
    setEditingTask:(task)=>set({editingTask:task}),
    themes:[],
    setThemes:(themes)=>set({themes:themes}),
    selectedThemes:[],
    setSelectedThemes:(themes)=>set({selectedThemes:themes}),
    doneCriterion:"all",
    setDoneCriterion:(criterion)=>set({doneCriterion:criterion}),
    sidebarOpen:true,
    setSidebarOpen:(open)=>set({sidebarOpen:open}),
    filteredTasks:[],
    setFilteredTasks:(tasks)=>set({filteredTasks:tasks})
}))

export default useTaskStore