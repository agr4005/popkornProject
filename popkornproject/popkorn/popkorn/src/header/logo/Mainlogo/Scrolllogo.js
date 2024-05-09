import logoIMG from "../logoIMG/popkorn_logo.svg";

import "./Mainlogo.css";

export default function Scrolllogo(){
   return (
      <img src={logoIMG} alt="logo_main" className='logo_scroll'></img>
   );
}