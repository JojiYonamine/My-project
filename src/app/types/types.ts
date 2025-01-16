import { FieldValue } from "firebase/firestore";

export interface baseEvent {
  title: string;
  createdBy: string;
  createdAt: Date | FieldValue;
}


export interface internalTask extends baseEvent {
  theme: string;
  due: boolean;
  dueDate?: Date;
  share: boolean;
  description: string;
  done: boolean;
}

export interface TaskShowing extends internalTask {
  taskId: string;
}



export interface userDoc {
  birthDay: Date | FieldValue;
  cid?: string;
  createdAt: Date | FieldValue;
  email: string;
  name: string;
  partnerId?: string;
  partnerName?: string;
}

