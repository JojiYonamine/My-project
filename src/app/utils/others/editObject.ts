// イベントや、タスクなどのオブジェクトの編集用
//input onChangeに設定することを想定してる
import { isValid, parseISO } from "date-fns";
import { IsoToDate } from "./dateUtils";

// type EditObjectType<T> = (
//   object: T|null,
//   setObject: (obj: T|null) => void
// ) => (e: React.ChangeEvent<HTMLInputElement>) => void;

export const useEditObject = <T extends object>(
  object: T | null,
  setObject: (obj: T | null) => void
): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    const editObject = (e: React.ChangeEvent<HTMLInputElement>) =>{
      if(!object) return
        const { value, name } = e.target;
        const newValue = isValid(parseISO(value)) ? IsoToDate(value) : value;
        setObject({ ...object, [name]: newValue });
    }
    return editObject

};
