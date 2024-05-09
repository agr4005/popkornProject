import { useState } from "react";
import { useEffect } from "react";
import PriceOutput from "../../../useModules/priceOutput/PriceOutput";


import "./Slot2.css"
import { Link } from "react-router-dom";

export default function Slot2({ item, index }) {

   const imageSrc = process.env.PUBLIC_URL + "/productIMG/";

   const [isActive, setIsActive] = useState(false);

   useEffect(() => {
      // 컴포넌트가 나타날 때 애니메이션 효과를 주기 위한 딜레이 적용
      const timeoutId = setTimeout(() => {
         setIsActive(true);
      }, index * 100); // 0.1초마다 딜레이 적용

      // 컴포넌트가 unmount되면 timeout 클리어
      return () => clearTimeout(timeoutId);
   }, [index]);


   return (
      <div className={`slot2_wrap ${isActive ? 'active' : ''}`}>
         <Link to={`/productdetail?next=/detailmaining`} state={{ item }}>
            <div>
               <img src={imageSrc + item.image1} alt="item_image" className="slot2_img" />
            </div>
         </Link>
            <div className={`slot2_span slot2_span-${index}`}>
               <span>{item.productname}
                  <PriceOutput priceWon={item.price} />
               </span>
            </div>
      </div>
   );
}