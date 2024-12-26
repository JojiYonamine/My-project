
import { ToolbarProps, View } from "react-big-calendar";

const DefaultToolbar = (props: ToolbarProps) => {
    const { label, onNavigate, onView } = props;
  return (
    <div className="rbc-toolbar">
      {/* ナビゲーションボタン */}
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onNavigate("PREV")}>
          &#8249; {/* 左向き矢印 */}
        </button>
        <button type="button" onClick={() => onNavigate("TODAY")}>
          Today
        </button>
        <button type="button" onClick={() => onNavigate("NEXT")}>
          &#8250; {/* 右向き矢印 */}
        </button>
      </span>

      {/* ラベル（現在の日付範囲） */}
      <span className="rbc-toolbar-label">{label}</span>

      {/* ビュー切り替えボタン */}
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onView("month")}>
          Month
        </button>
        <button type="button" onClick={() => onView("week")}>
          Week
        </button>
        <button type="button" onClick={() => onView("day")}>
          Day
        </button>
        <button type="button" onClick={() => onView("agenda")}>
          Agenda
        </button>
      </span>
    </div>
  );
};

export default DefaultToolbar;
