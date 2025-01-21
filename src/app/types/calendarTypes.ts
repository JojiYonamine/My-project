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
  advanced?:{
    location?:string;
    memo?:string;
    repeat:{
      frequncy:"daily"|"weekly"|"monthly"|"yearly";
      interval:number;
      endDate?:Date;
      count?:number
    }
  }
}
