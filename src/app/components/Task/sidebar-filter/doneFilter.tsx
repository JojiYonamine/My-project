// 終了フィルター

import useTaskOtherStore from "@/Context/Task/taskOtherStore";

export const DoneFilter = () => {
    const doneCriterion = useTaskOtherStore((state)=>state.doneCriterion)
    const setDoneCriterion = useTaskOtherStore((state)=>state.setDoneCriterion)
  return (
    <div>
      <h1>終了フィルター</h1>
      <select
        value={doneCriterion}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setDoneCriterion(e.target.value);
        }}
      >
        <option value="all">全て</option>
        <option value="undone">未完了</option>
        <option value="done">完了</option>
      </select>
    </div>
  );
};
