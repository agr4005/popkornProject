
import './DetailMainImg.css'
import { useLocation } from 'react-router-dom';

export default function DetailMainImg() {
    const Location = useLocation();
    
    const imageSrc = process.env.PUBLIC_URL + "/productIMG/";
    const pData = Location.state.item;
    
    return (
        <div className='mainimg' >
            <img src={imageSrc + pData.image1} alt='이미지'></img>
        </div>
    );
}