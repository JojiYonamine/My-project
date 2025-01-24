// 任意のオブジェクトのcolorを変更する
// 最終的には、色と名前を対応づけて選択できるようにしたい

interface colorObject {
  color: string;
}
// Tがcolorを持つことを保証する

interface ColorPickerProps<T extends colorObject> {
  object: T|null;
  setObject: (obj: T) => void;
}

const ColorPicker = <T extends colorObject>({ object, setObject }: ColorPickerProps<T>) => {
    if(!object){
        return(<h1>エラー</h1>)
    }
  const handleSelectColor = (color: string) => {
    setObject({ ...object, color: color });
  };
  const colorTags: Record<string, string> = {
    "#ff7fbf": "a",
    "#ff7fff": "b",
    "#bf7fff": "c",
    "#7f7fff": "d",
    "#7fffff": "e",
    "#7fff7f": "f",
    "#ffff7f": "g",
    "#7fffbf": "h",
  };
  return (
    <div className="bg-white flex items-center justify-between w-full px-1">
      {Object.entries(colorTags).map(([color, text]) => (
        <div key={color}>
          <div
            onClick={() => handleSelectColor(color)}
            className={`w-8 h-8 rounded cursor-pointer rounded-full
                  ${color == object?.color && "border-2 border-gray-500"}
                  `}
            style={{ backgroundColor: color }}
          />
          {/* <h1>{text}</h1> */}
        </div>
      ))}
    </div>
  );
};
