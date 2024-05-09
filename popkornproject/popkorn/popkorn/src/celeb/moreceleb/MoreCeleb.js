
export default function MoreCeleb({ celeb, setSelectCeleb}) {

   const imgSrc = process.env.PUBLIC_URL + "/celebIMG/"

   return (
      <div className="moreceleb_wrap">
         {
               <li className='itemLi'>
                  <button className='itemLi_btn' onClick={() => {setSelectCeleb(celeb)}}>
                     <img src={imgSrc+celeb.celebimg} alt="" className='item' />
                     <span className='itemname'>{celeb.artist}</span>
                  </button>
               </li>
         }
      </div>
   );
}