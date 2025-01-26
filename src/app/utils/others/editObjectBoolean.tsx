// 真偽値の変更を行う

type EditBooleanType<T> = (
  item: T,
  setItem: (obj: T) => void,
  property?:keyof T
) => () => void;

export const useEditBoolean: EditBooleanType<unknown> = (item, setItem,property) => {
  const editBoolean = () => {
    if (property && typeof item === "object" && item !== null) {
        const newBoolean:boolean = !item[property];
        setItem({ ...item, [property]: newBoolean });
      } else if (typeof item === "boolean") {
        setItem(!item);
      } else {
        console.log("useEditBooleanでエラー");
      }
  };
  return editBoolean
};
