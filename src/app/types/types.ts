import { FieldValue } from "firebase/firestore";

export interface baseEvent {
    // id: string;
    title:string;
    createdBy:string;
    createdAt:Date;
    // share:boolean;
}

export interface calendar {
    theme:string;
    description?:string;
    share:boolean;
    createdAt:Date|FieldValue;
}

export interface calendarEvent extends baseEvent{
    type:"calendarEvent";
    calendarTheme:"theme"
    allDay:boolean;
    start:Date;
    end:Date; //all day trueの時は、startに等しくなる
}