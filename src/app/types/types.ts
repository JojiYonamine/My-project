import { FieldValue } from "firebase/firestore";

export interface baseEvent {
    // id: string;
    title:string;
    createdBy:string;
    createdAt:Date|FieldValue;
    // share:boolean;
}

export interface calendarEvent extends baseEvent{
    allDay:boolean;
    start:Date|FieldValue;
    end:Date|FieldValue; //all day trueの時は、startに等しくなる
}


export interface calendar {
    theme:string;
    description?:string;
    color?:string;
    share:boolean;
    createdAt:Date|FieldValue;
}