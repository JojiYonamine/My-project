// カレンダー用の型

export interface calendar {
  calendarId: string;
  theme: string;
  description?: string;
  share: boolean;
  createdAt: Date;
  createdBy: string;
}

export interface calendarEvent {
  eventId?: string; //firebaseの各イベントのidをいれる
  title: string;
  createdBy: string;
  createdAt: Date;
  allDay: boolean;
  start: Date; //|FieldValue;
  end: Date; //|FieldValue; //all day trueの時は、startに等しくなる
  color: string;
  advanced: {
    location: string|null;
    memo: string|null ;
  }|null
  repeat: {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    interval: number; //デフォルトでは１を使う想定
    // 終了日→これ以降の予定を削除の時に設定する予定
    endDate:Date|null
    // 除外日→この予定のみを削除に使用予定
    // 開始日を設定することで日を跨ぐイベントにも適用できるか
    noDate:Date[]|null
  }|null;
}
