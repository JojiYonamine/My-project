export interface Task {
  taskId?: string;
  title: string;
  createdBy: string;
  createdAt: Date;
  themeId: string;
  dueDate?: Date;
  share: boolean;
  description?: string;
  done: boolean;
}

export interface TaskTheme {
    taskThemeId?:string;
    createdAt:Date
    name:string;
    color:string;
    share:boolean
    icon?:string;
}