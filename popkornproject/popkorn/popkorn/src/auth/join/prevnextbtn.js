import React from 'react';

export default function PrevNextButtons({ onPrevClick, onNextClick }) {

    return (
        <div>
            <button onClick={onPrevClick} className='emprevstep'>Prev Step</button>
            <button onClick={onNextClick} className='emnextstep'>Next Step</button>
        </div>
    );
}
