
import { useLocation, useNavigate } from "react-router-dom";
import "./Refund.css";
import { useEffect, useState } from "react";
import { apiCall } from "../service/apiService";
import PopkornBtn from "../useModules/PopkornBtn";
import Header from './../header/Header';

export default function Refund() {

    const Location = useLocation();
    const id = Location.state.id;// Object Type으로 전달 받음.

    const imageSrc = process.env.PUBLIC_URL + "/productIMG/";
    const navigate = useNavigate();
    const [items, setProduct] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // 전체상품체크 초기화
    const [selectCheck, setSelectCheck] = useState([]); // 각 각의 상품체크 초기화
    const [orderinfo, setOderinfo] = useState([{}]);

    useEffect(() => {
        apiCall(`/api/orderinfo/findByMerchantUid?merchantUid=${id}`, "GET", null, null)
            .then(response => {
                console.log(response.data)
                setOderinfo(response.data)
            }).catch(err => console.log(err))

        apiCall(`/api/orderdetail/orderlist?merchantUid=${id}`, "GET", null, null)
            .then(response => {
                setProduct(response.data);
                setSelectCheck(new Array(response.data.length).fill(false));
            }).catch(err => console.log(err))
    }, []);


    // 전체 상품을 선택/해제 기능
    const checkSelectAll = () => {
        // 모든 상품이 선택되어 있는지 확인
        const allChecked = selectCheck.every(check => check);

        // 모든 상품이 선택되어 있으면 전체 선택 해제
        if (allChecked) {
            setSelectAll(false);
            setSelectCheck(new Array(items.length).fill(false));
        } else {
            // 모든 상품 선택
            setSelectAll(true);
            setSelectCheck(new Array(items.length).fill(true));
        }
    };

    // 각 상품을 선택/해제하는 함수
    const checkSelect = (index) => {
        const updatedSelectCheck = [...selectCheck];
        updatedSelectCheck[index] = !updatedSelectCheck[index];
        setSelectCheck(updatedSelectCheck);

        // 전체 상품이 선택되어 있는지 확인
        const allChecked = updatedSelectCheck.every(check => check);

        // 하나라도 선택 해제되어 있으면 전체 선택 해제
        if (!allChecked) {
            setSelectAll(false);
        } else {
            // 모든 상품이 선택되어 있으면 전체 선택
            setSelectAll(true);
        }
    };

    function refundrConfirm() {
        if (window.confirm('Are you sure you to refund?')) {
            // 체크된 상품들만을 필터링하여 새로운 배열에 추가
            const selectedItems = items.filter((item, index) => selectCheck[index]);

            // 선택s된 상품들이 있는지 확인
            if (selectedItems.length === items.length) {
                apiCall("/api/orderinfo/refundrequest","POST", orderinfo[0], null)
                .then(response => {
                    if(response.data != null){
                        alert("The refund has been processed successfully. Redirecting to the main page.");
                        navigate("/");
                    } else {
                        alert("The refund failed. Please contact the administrator due to a server issue.")
                    }
                })
                .catch( err => console.log(err))

            } else {
                alert('Please select All products.');
            }
        }
    }

    // 장바구니 비어있을 시, 홈화면으로 이동
    function continueConfirm() {
        navigate('/')
    }

    return (
        <>
            <Header />
            <div className="refund_wrap">
                <div className='CartListFromDiv'>
                    <h1 style={{ color: ' #7de4ff' }}>Refund</h1>
                    <br></br>
                    <h4>Order number : <span> {orderinfo[0].merchantUid} </span></h4>
                    <h4>Order date : <span>  {orderinfo[0].paidAt} </span></h4>
                    <h4>Order address : <span> {orderinfo[0].buyerAddr} </span></h4>
                    <br></br>
                    <div className='container'>
                        {items.length !== 0 && (
                                <label>
                                    <input type="checkbox" onChange={checkSelectAll} checked={selectAll} />
                                    <span style={{ color: '#FE7CF3' }}>Select All</span>
                                </label>
                        )}
                    </div>

                    <div className="CartListFromitem">
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div key={index} item={item} index={index} className="cartListMain">
                                    <input type="checkbox" onChange={() => checkSelect(index)} checked={selectCheck[index]} />
                                    <img src={imageSrc + item.image1} alt="productdetail_img" />
                                    <div className="productnameclss">
                                        <span>{item.productname}</span>
                                        <span>[alternative : {item.alternative}]</span>
                                    </div>
                                    <span>{item.detailcount}</span>
                                    <span>￦{item.detailcount * item.price}</span>
                                </div>
                            ))
                        ) : (
                            <div className='noCartListFrom'>
                                <span className='xi-document'></span>
                                <span>Your order status does not exist.</span>
                            </div>
                        )}
                    </div>

                    <div className='popkornBtnbox'>
                        {items.length !== 0 ? (
                            <>
                                <PopkornBtn btnName={'Refund Execution!'} btntype={false} btnfun={refundrConfirm} />
                            </>
                        ) :
                            <>
                                <PopkornBtn btnName={'Continue shopping!'} btntype={true} btnfun={continueConfirm} />
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}