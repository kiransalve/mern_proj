import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

const Chart = ({ data, dataKey, title }) => {
  return (
    <div className="border rounded-lg px-1 md:w-min w-full md:mx-5">
      <div className="overflow-x-auto scroll-none">
        <h2 className="md:text-[20px] text-[14px] font-bold text-center my-4">
          {title}
        </h2>
        <BarChart data={data} width={500} height={300}>
          <XAxis dataKey={dataKey} tick={{ fill: "#fff" }} stroke="#fff" />
          <YAxis tick={{ fill: "#fff" }} tickCount={1} stroke="#fff" />

          <Bar dataKey="count" fill="#fff" barSize={30}>
            <LabelList
              dataKey="count"
              position="middle"
              fill="#8570ed"
              className="font-bold"
            />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default Chart;
