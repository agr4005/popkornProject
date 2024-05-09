import Orderproduct from './Orderproduct/Orderproduct';
import Header from '../header/Header';

import './Order.css';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PopkornBtn from '../useModules/PopkornBtn';
import { apiCall } from '../service/apiService';

export default function Order() {
    window.onbeforeunload = null;
    const loginCheck = sessionStorage.getItem('loginCheck');
    const storedLoginID = sessionStorage.getItem('loginID');
    const Location = useLocation();
    const [checkstatus, setcheckstatus] = useState(false);
    const [useReword, setuseReword] = useState(0);
    const [totalReword, setTotalReword] = useState(1000);
    const [maximumReword, setmaximumReword] = useState(0);
    const items = Location.state.items;
    const navigate = useNavigate();
    const [data, setData] = useState({
        merchant_uid: '',
        buyer_name: '',
        buyer_email: loginCheck === 'true' ? storedLoginID : '',
        buyer_postcode: 0,
        buyer_tel: '',
        paid_amount: 0,
        country: '',
        city: '',
        address1: '',
        address2: '',
        buyer_addr: ``
    });

    const preventRefresh = (event) => {
        event.preventDefault();
        event.returnValue = '';
    };

    const totalPrice = items.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.price * currentItem.detailcount);
    }, 0) - useReword;


    const handleInputChange = (event) => {
        const newValue = event.target.value;
        if (!isNaN(newValue)) {
            if (parseInt(newValue) > totalReword) {
                alert('Usage rewords cannot exceed retention rewords');
                setuseReword('1000');
                return;
            }
            if (maximumReword < totalReword && parseInt(newValue) > maximumReword) {
                alert('Usage rewords cannot exceed maximum rewords');
                setuseReword('1000');
                return;
            }
            setuseReword(newValue);
        } else {
            alert('Please enter a valid number.');
            setuseReword('1000');
        }
    };

    const handleBlur = (event) => {
        const currentValue = event.target.value;
        if (parseInt(currentValue) < 1000) {
            alert('At least 1000 rewords available for users');
            setuseReword('1000');
        }
    };

    useEffect(() => {
        window.addEventListener('beforeunload', preventRefresh);
        return () => {
            window.removeEventListener('beforeunload', preventRefresh);
        };
    }, []);

    useEffect(() => {
        possionRewords();
    }, []);

    const onClickPayment = (data) => {
        if (!data.buyer_name || !data.buyer_tel || !data.buyer_email || !data.address1 || !data.city || !data.country || !data.buyer_postcode) {
            alert("모든 배송정보, 결제정보를 입력해주세요.");
            return;
        }

        const emailinput = data.buyer_email;
        apiCall(`/api/orderdetail/emailcheck?emailinput=${emailinput}`, "GET", null, null)
            .then(checkresponse => {
                if (checkresponse.data === true && loginCheck === 'false') {
                    alert('Email already exists. Go to the login page.');
                    window.removeEventListener('beforeunload', preventRefresh);
                    window.location.href = '/auth';
                } else {
                    apiCall(`/api/product/checkDetailCount`, "POST", items, null)
                        .then(response => {
                            if (response.data.result) {
                                if (!window.IMP) return;
                                /* 1. 가맹점 식별하기 */
                                const { IMP } = window;
                                IMP.init(response.data.imp_uid); // 가맹점 식별코드

                                /* 2. 결제 데이터 정의하기 */
                                const toImpData = {
                                    pg: "html5_inicis.INIpayTest", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
                                    pay_method: "card", // 결제수단
                                    name : items.length > 1? items[0].productname + ` 외 ${items.length -1}개` : items[0].productname,
                                    merchant_uid: `pop_${new Date().getTime()}`, // 주문번호
                                    amount: 100, // 결제금액
                                    buyer_name: data.buyer_name, // 구매자 이름
                                    buyer_tel: data.buyer_tel, // 구매자 전화번호
                                    buyer_email: data.buyer_email, // 구매자 이메일
                                    buyer_addr: `${data.address2} ${data.address1} ${data.city} ${data.country}`, // 구매자 주소
                                    buyer_postcode: data.buyer_postcode, // 구매자 우편번호
                                };

                                /* 4. 결제 창 호출하기 */
                                window.removeEventListener('beforeunload', preventRefresh);

                                IMP.request_pay(toImpData, callback);

                            } else {
                                alert("Payment is not possible because the remaining items are less than the quantity you wish to purchase.")
                                return null;
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(error => {
                console.error('오류 발생:', error);
            });


    };

    function callback(response) {
        const { success, error_msg } = response;
        if (success) {
            try {
                items.map((item, i) => {
                    let newItem = { ...item };
                    delete newItem.ccode;
                    items[i] = { ...newItem, merchantUid: response.merchant_uid, pcode: +items[i].pcode};
                });

                // DB에 정보 입력 요청 보내기
                if (sendImpUidToServer(response.imp_uid, items, sessionStorage.getItem('loginID'))) {
                    // DB 입력 성공한 경우에만 navigate 호출
                    navigate('/ordercomplete', { state: { items: items, response: response } });
                } else {
                    alert("The order payment has failed due to a system issue. Please try again later.");
                }
            } catch (error) {
                alert("Order Failed !!");
                console.log(error);
            }
        } else {
            alert(`Order Failed !! : ${error_msg}`);
        }
    }

    function sendImpUidToServer(imp_uid, items, id) {
        const request = {
            "imp_uid": imp_uid,
            "items": items,
            "id": id,
            'rewordcheck' : checkstatus
        }
        if (apiCall(`/api/pay/datatoserver`, "POST", request)
            .then(response => {
                if (response.data) return true;
                else return false;
            })
            .catch(error => {
                alert("Order Failed !!");
                console.log(error)
                return false;
            })) return true;
        else return false;

    }

    const setDataHandler = useCallback((e) => {
        data[e.target.name] = e.target.value;
        setData({ ...data });
    }, [data])


    const possionRewords = async () => {
        try {
            const response = await apiCall('/api/user/rewordcheck?storedLoginID=' + storedLoginID, "GET", null, null);
            setmaximumReword(totalPrice / 2);
            setTotalReword(response.data);
        } catch (error) {
            console.error('오류 발생:', error);
        }
    }

    const handlerewordCheck = (event) => {
        const currentTotalReword = totalReword;
    
        if (event.target.checked === false) {
            setcheckstatus(false);
            return;
        }
    
        if (currentTotalReword < 1000) {
            alert('At least 1000 rewords available for users');
            return;
        }
    
        setcheckstatus(true);
        possionRewords();
    };


    return (
        <>
            <Header />
            <div className='orderBox'>
                <h1 style={{ color: ' #7de4ff' }}>Order</h1>
                <div className='orderWindow'>
                    <div>
                        <h3>Shipping Address</h3>
                        <div className="shippingAddressBox">
                            <p>Country/Region</p>
                            <select name='country' onChange={setDataHandler}>
                                <option value=''>Country Selection</option>
                                <option value='South Korea'>South Korea</option>
                                <option value='United States'>United States</option>
                                <option value='Japan'>Japan</option>
                            </select>
                            <p>City</p>
                            <input type="text" name='city' onChange={setDataHandler}></input>
                            <p>Address1</p>
                            <input type="text" name='address1' onChange={setDataHandler}></input>
                            <p>Address2</p>
                            <input type="text" name='address2' onChange={setDataHandler}></input>
                            <p>Zip code</p>
                            <input type="text" name='buyer_postcode' onChange={setDataHandler}></input>
                        </div>
                    </div>
                    <div className='OrderInformationMain'>
                        <h3>Order Information</h3>
                        <div className="orderInformationbox">
                            <p>Full Name</p>
                            <input type="text" name='buyer_name' onChange={setDataHandler}></input>
                            <p>Email</p>
                            {loginCheck === 'true' ? (
                                <input
                                    type="text"
                                    name="buyer_email"
                                    onChange={setDataHandler}
                                    value={storedLoginID}
                                    disabled
                                />
                            ) : (
                                <input
                                    type="text"
                                    name="buyer_email"
                                    onChange={setDataHandler}
                                />
                            )}

                            <p>Phone</p>
                            <input type="text" name='buyer_tel' onChange={setDataHandler}></input>
                            {storedLoginID ?
                                <>
                                    <p>Use Reword</p>
                                    <input type="checkbox" name='rewordcheck' onChange={handlerewordCheck} checked={checkstatus} />
                                    {checkstatus ? (
                                        <>
                                            Use Reword :
                                            <input
                                                type='text'
                                                value={useReword}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                            />
                                            <br />
                                            <div>You have {totalReword} rewords, can use up to {totalReword < maximumReword ? totalReword : maximumReword} rewords in this transaction</div>
                                        </>
                                    ) : (
                                        <>
                                            At least 1000 rewords available for users
                                        </>
                                    )}

                                </>
                                : ""
                            }
                        </div >
                        <h3>PaymentMethod</h3>
                        <div className="paymentMethodMain">
                            <PopkornBtn btnName={"Order Now"} btntype={false} btnfun={() => onClickPayment(data)} />
                        </div>
                    </div>
                </div>
                <Orderproduct items={items} useReword={useReword} totalPrice={totalPrice} />
            </div>

        </>
    );
}