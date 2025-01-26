// 終了フィルター

import useTaskOtherStore from "@/Context/Task/taskOtherStore";

export const DoneFilter = () => {
  const doneCriterion = useTaskOtherStore((state) => state.doneCriterion);
  const setDoneCriterion = useTaskOtherStore((state) => state.setDoneCriterion);
  return (
    <div className="flex text-center flex-col gap-2 overflow-hidden mx-4">
      <h1 className="font-semibold bg-pink-400 text-white p-1 rounded-lg max-h-8">完了状況フィルター</h1>
      <div className="flex items-center text-center justify-between">
        <button
          className={`bg-sky-400 p-1 hover:font-bold hover:text-white rounded-lg max-h-8 overflow-hidden
        ${doneCriterion === "all" ? "font-bold text-white" : "text-sky-200"}
        `}
          onClick={() => setDoneCriterion("all")}
        >
          すべて
        </button>
        <button
          className={`bg-amber-400 hover:font-bold hover:text-white p-1 rounded-lg max-h-8 overflow-hidden
                ${doneCriterion === "done" ? "font-bold text-white" : "text-amber-200"}`}
          onClick={() => setDoneCriterion("done")}
        >
          完了済
        </button>
        <button
          className={`bg-lime-400 hover:font-bold hover:text-white p-1 rounded-lg max-h-8 overflow-hidden
                  ${doneCriterion === "undone" ? "font-bold text-white" : "text-lime-200"}`}
          onClick={() => setDoneCriterion("undone")}
        >
          未完了
        </button>
      </div>
    </div>
  );
};
