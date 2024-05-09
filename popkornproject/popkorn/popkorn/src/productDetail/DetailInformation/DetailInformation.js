import React, { useState, useEffect } from 'react';
import TypeIt from "typeit-react";
import exocard from '../img/exocard.jpg';
import exobook from '../img/exobok.jpg';

import './DetailInformation.css';

export default function DetailInformation() {
    const [images, setImages] = useState([exocard, exobook, exocard, exobook, exocard, exobook]);
    const [imagePage, setImagePage] = useState(0);
    const [nobutton, setNoButton] = useState(false);

    const previousHandler = () => {
        setImagePage((imagePage) => (images.length + imagePage - 1) % images.length);
    };

    const nextHandler = () => {
        setImagePage((imagePage) => (imagePage + 1) % images.length);
    };

    useEffect(() => {
        const srid = setInterval(() => {
            setImagePage((imagePage) => (imagePage + 1) % images.length);
        }, 3500);

        return () => clearInterval(srid);
    }, [images.length]);

    return (
        <div className='recommen' onMouseEnter={() => setNoButton(true)} onMouseLeave={() => setNoButton(false)}>
            <TypeIt options={{
                loop: true
            }} className="titletype">
                I Also Recommend This Product!💁🏻‍♀️</TypeIt>
            <div className='minimg'>
                {nobutton && <button onClick={previousHandler} className='previousnext'>←</button>}
                <img src={images[imagePage]} className='minimg1' />
                <img src={images[imagePage]} className='minimg1' />
                <img src={images[imagePage]} className='minimg1' />
                {nobutton && <div className='nextimg'><button onClick={nextHandler} className='previousnext'>→</button></div>}
            </div>
        </div>
    );
}
