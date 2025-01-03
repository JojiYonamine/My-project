// 2025-01-01T01:06

import { FieldValue, Timestamp } from "firebase/firestore";

//なんか、Date()の引数を変えればこれ使わなくてもいけそう、うーんでも、作っておいた方が後々楽っぽいので少し要素追加して完成させ、date-fnsとうまく組み合わせて
export const FormatDate = (date:string) => {
    const year:string = date.slice(0,4);
    const month:string = date.slice(5,7);
    const day:string = date.slice(8,10);
    const hour:string = date.slice(11,13);
    const minute:string = date.slice(14,16);
    return {
        year:year,
        month:month,
        day:day,
        hour:hour,
        minute :minute,
    }
};

export const dateAndTimeToIso = (date:Date) => {
    return date.toISOString().slice(0,16);
}

export const dateToIso = (date:Date) => {
    return date.toISOString().slice(0,10);
}

export const IsoToDate = (ISO:string) => {
    return new Date(ISO)
}

export const timestampToDate = (timestamp:Timestamp) =>{
    return timestamp.toDate()
}