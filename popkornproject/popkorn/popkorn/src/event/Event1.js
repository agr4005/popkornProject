
import { useState, useEffect, useRef } from 'react';

import './Event1.css';
import './pImg.css';

import pImg1 from "./Event1Img/lesserafim.svg";
import { Link } from 'react-router-dom';

export default function Event1() {

   const item = {
      productname: 'EASY',
      artist: 'LE SSERAFIM',
      price: 19300,
      image1: 'easy.png'
   }


   const [rotateX, setRotateX] = useState(0);
   const [rotateY, setRotateY] = useState(0);
   const [increase, setIncrease] = useState(true);
   const pathRef = useRef(null);

   const handleMouseMove = (e) => {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;

      const newRotateY = (-1 / 5) * x + 20;
      const newRotateX = (4 / 30) * y - 20;

      setRotateY(newRotateY);
      setRotateX(newRotateX);


   };

   const handleMouseOut = () => {

      if (pathRef.current) {
         pathRef.current.classList.remove('active');
      }

      setRotateY(0);
      setRotateX(0);
   };


   useEffect(() => {
      const autoRotate = () => {
         setRotateY((prevRotateX) => {
            if (increase) {
               // flag 변수가 true이면 prevRotateX 값을 20px까지 증가
               if (prevRotateX < 20) {
                  return prevRotateX + 0.1;
               } else {
                  // 20px에 도달하면 flag를 false로 변경
                  setIncrease(false);
                  return prevRotateX;
               }
            } else {
               // flag 변수가 false이면 prevRotateX 값을 1px씩 감소
               if (prevRotateX > -20) {
                  return prevRotateX - 0.1;
               } else {
                  // -20px에 도달하면 flag를 true로 변경
                  setIncrease(true);
                  return prevRotateX;
               }
            }
         });
      };

      const intervalId = setInterval(autoRotate, 10);

      return () => clearInterval(intervalId);
   }, [increase]);

   const signitureHadler = () => {
      // path 요소에 active 클래스를 추가
      if (pathRef.current) {
         pathRef.current.classList.add('active');
      }
   }

   return (
      <div className='event1_wrap'>
         <div >
            <iframe width="100%" height="700" src="https://www.youtube.com/embed/bNKXxwOQYB8" title="LE SSERAFIM (르세라핌) &#39;EASY&#39; OFFICIAL MV" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <div className='custom-rectangle active'>
               <div className='event_Pcircle'>
                  <Link to={`/productdetail?next=/detailmaining`} state={{ item }}>
                     <div
                        className="pImg_container"
                        onMouseMove={handleMouseMove}
                        onMouseOut={handleMouseOut}
                        onMouseEnter={signitureHadler}
                        style={{ transform: `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
                     >
                        <svg id="Layer_1" className='Layer_1' data-name="Layer 1"
                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 679.34 336.38">
                           <path ref={pathRef} d="M2.66,176.04s5.29-10.21,22.09-26.54c16.79-16.33,45.09-38.79,91.09-63.29s40.25-5.75,22.94,19.19-46.19,56.06-46.44,56.31c-7.5,7.5-24.49,33.75-28.86,50.19s3.88,23.06,46.88-8.69,104.49-72.88,155.24-106.06,90.75-58.44,90.75-58.44c0,0-50.25,70.25-105,141.88s-114,144.62-132,150.12-20.75,2-16.62-5.75,15.13-19.75,24.62-31.25,45.5-51,87.88-91.25,91.13-81.25,126.12-95.75l.5,11,.5,11s5.25-5.25,13.12-9.5,18.38-7.5,28.88-3.5c0,0,14.25-22.5,35.37-46.88,21.12-24.38,49.12-50.62,76.62-58.12s47-12,53.25-1.62-.75,35.62-26.25,87.62-49.5,97.75-73.25,132.75c-23.75,35-47.25,59.25-71.75,68.25s-36.5,7-39-2.62,4.5-26.88,18-48.38,61.25-64.5,109.75-99.75,97.75-62.75,114.25-53.25c0,0-7.5,6.5-9.88,12.5s.38,11.5,20.88,9.5,42.25-3,58.88-3.5,28.12-.5,28.12-.5m-42.5-66.5s0,3,2.12,6.88,6.38,8.63,14.88,12.12m17.61-19l-16.06,17.25-16.06,17.25" />
                        </svg>
                        <img className='event_pImg card card__glare' src={pImg1} alt="pImg" />
                     </div>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
