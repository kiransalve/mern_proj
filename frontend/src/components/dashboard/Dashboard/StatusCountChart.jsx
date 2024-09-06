import Chart from "./Chart";
import useStatusCount from "../../../hooks/useStatusCount";

const StatusCountChart = () => {
  const statusData = useStatusCount();
  return (
    <div>
      <Chart data={statusData} dataKey="status" title={"Status Count Chart"} />
    </div>
  );
};

export default StatusCountChart;
