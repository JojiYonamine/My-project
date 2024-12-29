import { TaskShowing } from "@/types/types";
import { FieldValue } from "firebase/firestore";

export function ensureUser(
  user: { uid: string; email: string | null; name: string | null } | null
): asserts user is { uid: string; email: string | null; name: string | null } {
  if (!user) {
    throw new Error("User is required but was null");
  }
}

export function ensureUid(uid: string | null): asserts uid is string {
  if (!uid) {
    throw new Error("UID is required but was null");
  }
}
export function ensureCid(cid: string | null): asserts cid is string {
  if (!cid) {
    throw new Error("CID is required but was null");
  }
}

export function ensureDate(data:Date|FieldValue):asserts data is Date{
  if(!(data instanceof Date) || isNaN(data.getTime())){
    throw new Error("data is not date")
  }
}

export function ensureString(eventId:string|undefined): asserts eventId is string{
  if(!eventId)
    throw new Error(`${eventId} is not string`)
}

export function ensureStrings(strings:string[]|null):asserts strings is string[]{
  if(!strings)
    throw new Error("this is not string[]")
}

export function ensureTask(task:TaskShowing|null):asserts task is TaskShowing{
  if(!task)
    throw new Error("task is null")
  if (
    typeof task.taskId !== "string" ||
    typeof task.title.trim() !== "string" 
  ) {
    throw new Error("task has invalid properties");
  }
}


export function ensureTasks(tasks:TaskShowing[]|null):asserts tasks is TaskShowing[]{
  if(!tasks)
    throw new Error("task is null")
}