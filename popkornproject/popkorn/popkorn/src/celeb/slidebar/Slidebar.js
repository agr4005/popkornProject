
import Slideshow from "./Slideshow";

import "./Slidebar.css";

export default function Slidebar({celebs, setSelectCeleb}) {
    return (
        <div className="slide_container">
            <Slideshow celebs={celebs} setSelectCeleb={setSelectCeleb}/>
        </div>
    );
}