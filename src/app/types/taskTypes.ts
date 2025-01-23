export interface Task {
  taskId?: string;
  title: string;
  createdBy: string;
  createdAt: Date;
  theme: string;
//   due: boolean;
  dueDate?: Date;
  share: boolean;
  description?: string;
  done: boolean;
}
