import DetailMainImg from "./DetailMainImg/DetailMainImg";
import DetailOrder from "./DetailOrder/DetailOrder";
import BodyImg from "./BodyImg/BodyImg";
import DetailRecommendation from "./DetailRecommendation/DetailRecommendation";
import { useEffect } from "react";

import Header from '../header/Header';


import './ProductDetail.css';

export default function ProductDetail() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <div className="productDetailMain">
                <div className="orderMain">
                    <DetailMainImg />
                    <DetailOrder />
                </div>
                <BodyImg />
                <DetailRecommendation />
            </div>
        </>
    );
}