import { useState } from "react";
import "./Celeb.css";
import Slidebar from "./slidebar/Slidebar";
import MoreCeleb from "./moreceleb/MoreCeleb";



export default function Celeb({celebs, setSelectCeleb}) {

   const [isSlider, setIsSlider] = useState(true);


   const moreBTNHandler = () => {
      isSlider ? setIsSlider(false) : setIsSlider(true)
   }


   return (
      <div className="celeb_wrap">
         <div className="span_div">
            <span>CELEB for You !</span>
            <span className="celeb_morebtn" onClick={moreBTNHandler}>More...</span>
         </div>
         <div className={`celebbar ${isSlider ? '' : 'moreActive'}`}>
            <div className="celebbar_gradient1">
               <div className={`celebbar_gradient2 ${isSlider ? '' : 'moreActive'}`}>
                  {
                     isSlider ?
                        <Slidebar celebs={celebs} setSelectCeleb={setSelectCeleb}/>
                        : celebs.map((celeb, index)=><MoreCeleb celeb={celeb} setSelectCeleb={setSelectCeleb} key={index}/>)
                  }
               </div>
            </div>
         </div>
      </div>
   );
}