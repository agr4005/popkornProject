import { Link } from "react-router-dom";

export default function Mainlogo() {

   return (
      <Link to="/" className="logo_a" >
            <img src="logoIMG/popkorn_logo.svg" onClick={()=>window.scrollTo(0,0)}className="logo_main" alt="logoIMG" id="logo_main"></img>
      </Link>
   );
}
