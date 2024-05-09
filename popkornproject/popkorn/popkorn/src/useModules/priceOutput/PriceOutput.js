import { useState, useEffect } from 'react';
import nowRate from "./nowRate";
import "./PriceOutput.css";

export default function PriceOutput({ priceWon }) {
    const [radioCheck, setRadioCheck] = useState(true);
    const [currType, setCurrType] = useState("$");
    const [rate, setRate] = useState(1378.80); // 기본값 설정

    const fetchRate = async () => {
        const rate = await nowRate();
        setRate(rate);
    };

    useEffect(() => {
        fetchRate();
    }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

    const radioHandler = () => {
        setRadioCheck(!radioCheck);
        setCurrType(currType === "$" ? "￦" : "$");
    };

    return (
        <div className="priceoutput_wrap">
            <span className='priceoutput_check' onClick={radioHandler} >￦<i className='xi-exchange'>$</i></span>
            {radioCheck ?
                <span style={{ fontWeight: 'bold' }}> ￦{priceWon.toLocaleString()}</span> :
                <span style={{ fontWeight: 'bold' }}>${((priceWon / rate).toFixed(2))}</span>
            }
        </div>
    );
}