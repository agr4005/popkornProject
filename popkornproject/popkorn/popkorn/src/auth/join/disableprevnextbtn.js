import React from 'react';

export default function DisableprevNextButtons({ onPrevClick, onNextClick }) {
    return (
        <div>
            <button className='disableprevbtn' onClick={onPrevClick}>Prev Step</button>
            <button className='disablenextbtn' disabled>Next Step</button>
        </div>
    );
}
