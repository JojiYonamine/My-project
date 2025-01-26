// イベントや、タスクなどのオブジェクトの編集用
//input onChangeに設定することを想定してる
import { isValid, parseISO } from "date-fns";
import { IsoToDate } from "./dateUtils";

type EditObjectType<T> = (
  object: T,
  setObject: (obj: T) => void
) => (e: React.ChangeEvent<HTMLInputElement>) => void;

export const useEditObject: EditObjectType<object> = (object, setObject) => {
    const editObject = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { value, name } = e.target;
        const newValue = isValid(parseISO(value)) ? IsoToDate(value) : value;
        setObject({ ...object, [name]: newValue });
    }
    return editObject

};
