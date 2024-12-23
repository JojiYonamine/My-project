export interface baseEvent {
    id: string;
    owner:string;
    allDay:boolean;
    title:string;
    start:Date;
    end?:Date; //オプション！all day falseの時だけ使おう
}

export interface calendarEvent extends baseEvent{
    type:"event";
    calendarTheme:"string"
}