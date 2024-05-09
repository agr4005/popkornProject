import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slidebar.css";

const Slideshow = ({celebs, setSelectCeleb}) => {

    const imgSrc = process.env.PUBLIC_URL + "/celebIMG/"

    const settings = {
        slide: "itemLi",
        dots: false,
        infinite: true,
        speed: 700,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false, //화살표 없애기
        pauseOnHover : true,
        adaptiveHeight: true,
        variableWidth: true,
        draggable: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
        <ul className="slide_wrapper">
            <Slider {...settings}>
                {celebs.map((s, i) => (
                    <li key={i} className='itemLi'>
                        <button className='itemLi_btn' onClick={()=>{setSelectCeleb(s)}}>
                            <img src={imgSrc+s.celebimg} alt="" className='item' />
                            <span className='itemname'>{s.artist}</span>
                        </button>
                    </li>
                )
                )}
            </Slider>
        </ul>
    );
}

export default Slideshow;

