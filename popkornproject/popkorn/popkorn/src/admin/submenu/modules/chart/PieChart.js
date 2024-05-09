
import React from "react";
import ReactApexChart from "react-apexcharts";

import "./PieChart.css";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 600,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 500,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="pie"
        width={470}
      />
    );
  }
}

export default function PieChart() {
  return (
    <div className="piechart_wrap">
      <div className="piechart_header">
        <span>Pie Chart</span>
        <div className="piechart_title">Sales Percentage</div>
      </div>
      <ApexChart />{/* ApexChart 컴포넌트를 여기에 넣습니다. */}
    </div>
  );
}