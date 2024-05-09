
import React from "react";
import ReactApexChart from "react-apexcharts";

import "./DashChart.css";

class ApexChart extends React.Component {
   constructor(props) {
     super(props);

     this.state = {
     
       series: [{
           name: "Session Duration",
           data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
         },
         {
           name: "Page Views",
           data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
         },
         {
           name: 'Total Visits',
           data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
         }
       ],
       options: {
         chart: {
           height: 350,
           type: 'line',
           zoom: {
             enabled: false
           },
         },
         dataLabels: {
           enabled: false
         },
         stroke: {
           width: [5, 7, 5],
           curve: 'straight',
           dashArray: [0, 8, 5]
         },
         legend: {
           tooltipHoverFormatter: function(val, opts) {
             return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
           }
         },
         markers: {
           size: 0,
           hover: {
             sizeOffset: 6
           }
         },
         xaxis: {
           categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
             '10 Jan', '11 Jan', '12 Jan'
           ],
         },
         tooltip: {
           y: [
             {
               title: {
                 formatter: function (val) {
                   return val + " (mins)"
                 }
               }
             },
             {
               title: {
                 formatter: function (val) {
                   return val + " per session"
                 }
               }
             },
             {
               title: {
                 formatter: function (val) {
                   return val;
                 }
               }
             }
           ]
         },
         grid: {
           borderColor: '#f1f1f1',
         }
       },
     
     
     };
   }

 

   render() {
     return (
       <div>
         <div id="chart">
           <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={325} width={400}/>
         </div>
         <div id="html-dist"></div>
       </div>
     );
   }
 }

 export default function DashChart() {
   return (
     <div className="dashchart_wrap">
       <div className="dashchart_header">
         <span>Dash Chart</span>
         <div className="dashchart_title">Page Statistics</div>
       </div>
       <ApexChart />{/* ApexChart 컴포넌트를 여기에 넣습니다. */}
     </div>
   );
 }