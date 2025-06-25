import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

function SankeyChart() {
  const [data, setData] = useState([
    ["From", "To", "Weight", { role: "style" }]
  ]);

  useEffect(() => {
    axios.get("http://localhost:5050/api/sankey").then((res) => {
      const chartData = res.data.map((row) => [
        row.source,
        row.target,
        row.value,
        row.color
      ]);
      setData((prev) => [...prev, ...chartData]);
    });
  }, []);

  const options = {
    sankey: {
      link: {
        colorMode: "gradient", // use 'style' column for color
      },
      node: {
        label: { fontSize: 14 },
      },
    },
  };

  return (
    <div>
      <h2>Sankey Chart (Grouped Flow Colors)</h2>
      <Chart
        chartType="Sankey"
        width="100%"
        height="500px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default SankeyChart;
