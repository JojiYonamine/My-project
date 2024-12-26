import { TaskShowing } from "@/types/types"
import { taskRef, tasksRef } from "../firestoreRefs"
import { getDocs } from "firebase/firestore"


export const fetchTasks = async (cid:string):Promise<TaskShowing[]> => {
    const snapShot = await getDocs(tasksRef(cid))
    return snapShot.docs.map((doc) => ({
        taskId:doc.id,
        title: doc.data().title,
        theme:doc.data().theme,
        description:doc.data().description,
        dueDate:doc.data().dueDate.toDate(),
        createdBy: doc.data().createdBy,
        createdAt: doc.data().createdAt.toDate(),
        share:doc.data().share,
        done:false
      }));
}