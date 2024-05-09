import Slot2 from "./slot2/Slot2"
import "./Product.css";
import Pagination from "../../useModules/pagination/Pagination";
import { useEffect, useState } from "react";

export function NewAll({ productData }) {

    return (<>
        <div className="pruduct_album_wrap">
            <span className="pruduct_album_wrap_span"><i className="xi-album"></i> ALBUM</span>
            <div className="pruduct_album_wrap_slot">
                {
                    productData.servData.map((item, index) => {
                        if (item.categoryl === 'album') {
                            return <Slot2 key={index} item={item} index={index} />
                        } else {
                            return null
                        }
                    }
                    )
                }
            </div>
        </div>
        <div className="pruduct_goods_wrap">
            <span className="pruduct_album_wrap_span"><i className="xi-gift-o"></i> GOODS</span>
            <div className="pruduct_album_wrap_slot">
                {
                    productData.servData.map((item, index) => {
                        if (item.categoryl === 'goods') {
                            return <Slot2 key={index} item={item} index={index} />
                        } else {
                            return null
                        }
                    }
                    )
                }
            </div>
        </div>
        <div className="pruduct_photo_wrap">
            <span className="pruduct_album_wrap_span"><i className="xi-camera"></i> PHOTO</span>
            <div className="pruduct_album_wrap_slot">
                {
                    productData.servData.map((item, index) => {
                        if (item.categoryl === 'photo') {
                            return <Slot2 key={index} item={item} index={index} />
                        } else {
                            return null
                        }
                    }
                    )
                }
            </div>
        </div>
    </>);
}

export function Else({ productData, setPageState }) {

    return (
        <div className='subproduct_container'>
            <div className="subproduct_wrap">
                {
                    productData.servData.map((item, index) =>
                        <Slot2 key={index} item={item} index={index} />
                    )
                }
            </div>
            <Pagination pageData={productData.pageData} setPageState={setPageState} />
        </div>
    );
}

export default function Product({ currCategorylRef, productData, setPageState }) {

    const [elseKey, setElseKey] = useState(0); // Key 값을 변경하기 위한 상태

    useEffect(() => {
        // productData가 변경될 때마다 key 값을 업데이트하여 Else 컴포넌트를 새로 마운트
        setElseKey(prevKey => prevKey + 1);
    }, [productData]);

    return (
        <>
            <div className="product_wrap">
                {
                    currCategorylRef.current === 'new' ?
                        <NewAll productData={productData} />
                        :
                        <Else key={elseKey} productData={productData} setPageState={setPageState} />
                }
            </div>
        </>
    )
}