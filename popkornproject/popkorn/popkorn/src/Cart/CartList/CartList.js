import { useState } from "react";
import "./CartList.css";


// CartListFrom로 다 옮김 해당페이지 사용x(일단 삭제는 하지말기)


export default function CartList({ item, index }) {

    const imageSrc = process.env.PUBLIC_URL + "/productIMG/";

    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    };


    return (
        <div key={index} className="cartListMain">
            <input type="checkbox" onChange={handleSelectAll} checked={selectAll} />
            <img src={imageSrc + item.image1} alt="productdetail_img" />
            <div className="productnameclss">
                <span>{item.productname}</span>
                <span>[alternative : {item.alternative}]</span>
            </div>
            <span>{item.detailcount}</span>
            <span>{item.detailcount * item.price}</span>
        </div>
    )
}