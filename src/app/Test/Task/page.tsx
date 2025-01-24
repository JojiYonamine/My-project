import { Task } from "@/types/taskTypes";

const TaskCard = () => {
  const sampleTasks: Task[] = [
    {
      taskId: "1",
      title: "プロジェクト提案書作成",
      createdBy: "user123",
      createdAt: new Date("2023-10-01T09:00:00"),
      theme: "仕事",
      dueDate: new Date("2023-10-05T17:00:00"),
      share: true,
      description: "クライアント向けのプロジェクト提案書を作成する。",
      done: false,
    },
    {
      taskId: "2",
      title: "ジムに行く",
      createdBy: "user456",
      createdAt: new Date("2023-10-02T10:00:00"),
      theme: "健康",
      dueDate: new Date("2023-10-02T12:00:00"),
      share: false,
      description: "週に一度のジムでの筋トレ。",
      done: true,
    },
    {
      taskId: "3",
      title: "チームミーティング",
      createdBy: "user789",
      createdAt: new Date("2023-10-03T14:00:00"),
      theme: "仕事",
      dueDate: new Date("2023-10-03T15:00:00"),
      share: true,
      description: "進行中のプロジェクトに関するチームミーティング。",
      done: false,
    },
    {
      taskId: "4",
      title: "買い物リスト作成",
      createdBy: "user123",
      createdAt: new Date("2023-10-04T08:00:00"),
      theme: "家庭",
      share: false,
      description: "今週末に必要な買い物リストを作成。",
      done: false,
    },
    {
      taskId: "5",
      title: "プレゼン資料確認",
      createdBy: "user456",
      createdAt: new Date("2023-10-05T10:30:00"),
      theme: "仕事",
      dueDate: new Date("2023-10-05T16:00:00"),
      share: true,
      description: "プレゼンテーション前に資料を確認する。",
      done: true,
    },
  ];
  const sampleTask = sampleTasks[0]

  return(
    <div className="w-60 h-60" style={{backgroundColor:"#ff7fbf"}}>

    </div>
  )
};
