import { FieldValue } from "firebase/firestore";

export interface baseEvent {
    title:string;
    createdBy:string;
    createdAt:Date|FieldValue;
}

//送信するときの型
export interface calendarEvent extends baseEvent{
    allDay:boolean;
    start:Date;//|FieldValue;
    end:Date;//|FieldValue; //all day trueの時は、startに等しくなる
}

//受信して表示するとき用の型
export interface calendarEventShowing extends calendarEvent{
    eventId:string; //firebaseの各イベントのidをいれる
}

export interface calendar {
    id?:string
    theme:string;
    description?:string;
    color?:string;
    share:boolean;
    createdAt:Date|FieldValue;
}

export interface internalTask extends baseEvent{
    theme:string;
    due:boolean;
    dueDate?:Date;
    share:boolean;
    description:string;
    done:boolean;
}

export interface TaskShowing extends internalTask{
    taskId:string
}