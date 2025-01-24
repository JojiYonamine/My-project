// タスクのバリデーションを行う関数

import { Task } from "@/types/taskTypes";

export const validateTask = (task: Task | null): string[] => {
  const errors: string[] = [];
  if (!task) {
    errors.push("タスクを選択してください");
    return errors;
  }
  if (!task.title) {
    errors.push("タイトルを入力してください");
  }
  if (!task.themeId) {
    errors.push("テーマを選択してください");
  }
  return errors;
};
