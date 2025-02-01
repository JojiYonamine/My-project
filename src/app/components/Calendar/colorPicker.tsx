import useCalendarEventStore from "@/Context/Calendar/calendarEventStore";
import React from "react";

const ColorPicker: React.FC = () => {
  const setSelectedEvent = useCalendarEventStore((state) => state.setSelectedEvent);
  const selectedEvent = useCalendarEventStore((state) => state.selectedEvent)!;

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

  const handleSelectColor = (color: string) => {
    setSelectedEvent({ ...selectedEvent, color: color });
  };
  return (
    <div className="bg-white flex items-center justify-between w-full px-1">
      {Object.entries(colorTags).map(([color]) => (
        <div key={color}>
          <div
            onClick={() => handleSelectColor(color)}
            className={`w-8 h-8 rounded cursor-pointer rounded-full
              ${color == selectedEvent?.color && "border-2 border-gray-500"}
              `}
            style={{ backgroundColor: color }}
          />
          {/* <h1>{text}</h1> */}
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
