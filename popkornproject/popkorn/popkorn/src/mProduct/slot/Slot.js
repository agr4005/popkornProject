import { useState } from "react";
import { useEffect } from "react";

import "./Slot.css"
import PriceOutput from "../../useModules/priceOutput/PriceOutput";
import { Link } from "react-router-dom";

export default function Slot({ item, index }) {
   const mproductSrc = process.env.PUBLIC_URL + '/productIMG/';
   const [isActive, setIsActive] = useState(false);

   useEffect(() => {
      // 컴포넌트가 나타날 때 애니메이션 효과를 주기 위한 딜레이 적용
      const timeoutId = setTimeout(() => {
         setIsActive(true);
      }, index * 100); // 0.1초마다 딜레이 적용

      // 컴포넌트가 unmount되면 timeout 클리어
      return () => clearTimeout(timeoutId);
   }, [index]);
   
   const handleHover = () => {
      const slotSpan = document.querySelector(`.slot_span-${index}`);
      slotSpan.classList.add('hover');
   };

   const handleMouseOut = () => {
      const slotSpan = document.querySelector(`.slot_span-${index}`);
      slotSpan.classList.remove('hover');
   };


   return (
      <div className={`slot_wrap ${isActive ? 'active' : ''}`} onMouseEnter={handleHover} onMouseLeave={handleMouseOut}>
         <Link to={`/productdetail?next=/detailmaining`} state={{ item }}>
         <div>
            <img src={mproductSrc+item.image1} alt="item_image" className="slot_img" />
         </div>
         </Link>
         <div className={`slot_span slot_span-${index}`}>
            <span style={{ display: 'block'}}>{item.productname}</span>
            <PriceOutput priceWon={item.price}/>
         </div>
         <div className="slot_sha"></div>
      </div>
   );
}