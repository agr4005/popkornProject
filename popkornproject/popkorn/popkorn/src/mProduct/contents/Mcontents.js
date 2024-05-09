import { useEffect, useState } from "react";
import Slot from "../slot/Slot";
import { apiCall } from "../../service/apiService";

export default function Mcontents({selectCeleb}) {

   const [artistProducts, setArtistProducts] = useState([]);
   const logoSrc = process.env.PUBLIC_URL + '/celebIMG/';

   useEffect(()=>{
      apiCall(`/api/product/findByArtist?artist=${selectCeleb.artist}`, "GET", null, null)
      .then(response=>{
         setArtistProducts(response.data)
      }).catch(err => console.log)
   }, [selectCeleb.artist])

   const gotoCelebsProduct = ()=>{
      
   }

   return (
      <div className="mcontent_grid_container">
         <div className="artistLogo" onClick={gotoCelebsProduct}>
            <img src={logoSrc+selectCeleb.celebimg} alt="celeb_img" className="mp_artistLogo_img"/>
            <span>{selectCeleb.artist}</span>
         </div>
         {
            artistProducts.map((item, i) => {
                  return <div key={i} className="mp_i_wrap"><Slot item={item} index={i}/></div>;
            })
         }

      </div>
   );
}