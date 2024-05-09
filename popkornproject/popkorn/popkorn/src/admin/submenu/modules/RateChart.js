
import { useState, useEffect } from "react";
import "./RateChart.css";
import nowRate from "../../../useModules/priceOutput/nowRate";


export default function RateChart() {
   const [rate, setRate] = useState(1); // 기본값 설정

   const fetchRate = async () => {
       const rate = await nowRate();
       setRate(rate);
   };

   useEffect(() => {
       fetchRate();
   }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행


   const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
   });

   const [date, setDate] = useState(() => formattedDate.format(new Date()))

   const tick = () => {
      setDate(formattedDate.format(new Date()))
   }

   useEffect(() => {
      const timeId = setInterval(() => tick(), 1000)

      return () => {
         clearInterval(timeId)
      }
   })




   return (
      <div className="ratechart_wrap">
         <div className="ratechart_header">
            <span>Exchage Rate</span>
            <div className="ratechart_clock">{date}</div>
         </div>
         <div className="ratechart_table">
                  <span>Dollor</span>
                  <span>Won</span>
                  <p>1<i className="xi-dollar"></i></p>
                  <p>{rate}￦</p>
         </div>
      </div>
   );
}