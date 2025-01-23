// 終了フィルター

import useTaskStore from "@/Context/taskStore";

export const DoneFilter = () => {
    const doneCriterion = useTaskStore((state)=>state.doneCriterion)
    const setDoneCriterion = useTaskStore((state)=>state.setDoneCriterion)
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
