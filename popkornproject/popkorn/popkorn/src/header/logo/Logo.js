import Mainlogo from './Mainlogo/Mainlogo'

import p from './logoIMG/logo_p.svg'
import o from './logoIMG/logo_o.svg'
import p2 from './logoIMG/logo_p2.svg'
import o2 from './logoIMG/logo_o2.svg'
import r from './logoIMG/logo_r.svg'
import n from './logoIMG/logo_n.svg'


const flogo = {
   width: "3em",
}

const blogo = {
   width: "3em",
}

function Flogo({ isScrolled }) {
   return (
      <div className='logo_imgsbox1'>
         <img src={p} alt="logo_p" style={flogo} className={`logo_imgs1 ${isScrolled ? "fade-out" : ""}`} />
         <img src={o} alt="logo_o" style={flogo} className={`logo_imgs1 ${isScrolled ? "fade-out" : ""}`} />
         <img src={p2} alt="logo_p2" style={flogo} className={`logo_imgs1 ${isScrolled ? "fade-out" : ""}`} />
      </div>
   );

}
function Blogo({ isScrolled }) {
   return (
      <div className='logo_imgsbox2'>
         <img src={o2} alt="logo_o2" style={blogo} className={`logo_imgs2 ${isScrolled ? "fade-out" : ""}`} />
         <img src={r} alt="logo_r" style={blogo} className={`logo_imgs2 ${isScrolled ? "fade-out" : ""}`} />
         <img src={n} alt="logo_n" style={blogo} className={`logo_imgs2 ${isScrolled ? "fade-out" : ""}`} />
      </div>
   );
}


export default function Logo({ isScrolled, handleLogoMouseOver }) {




   return (
      <div className={`logo_wrap`}>
         <Flogo isScrolled={isScrolled} />
         <div onMouseOver={handleLogoMouseOver} className={`logo_main`}>
            <Mainlogo/>
         </div>
         <Blogo isScrolled={isScrolled} />
      </div>
   );
}