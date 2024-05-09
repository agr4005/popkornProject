import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PopkornBtn from '../../useModules/PopkornBtn';
import "./CartListFrom.css";
import { apiCall } from '../../service/apiService';

export default function CartListFrom() {
    const imageSrc = process.env.PUBLIC_URL + "/productIMG/";
    const navigate = useNavigate();
    const [items, setProduct] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // 전체상품체크 초기화
    const [selectCheck, setSelectCheck] = useState([]); // 각 각의 상품체크 초기화

    useEffect(() => {
        apiCall(`/api/cart/selectlist?id=${sessionStorage.getItem('loginID')}`, "GET", null, null)
            .then(response => {
                setProduct(response.data);
                setSelectCheck(new Array(response.data.length).fill(false));
            }).catch(err => console.log(err))
    }, []);


    const deleteHandler = () => {
        const updatedItems = items.filter((_, index) => !selectCheck[index]);
        setProduct(updatedItems);

        const checkedItemIds = selectCheck.reduce((acc, checked, index) => {
            if (checked) {
                acc.push({ id: items[index].id, pcode: items[index].pcode, productname: items[index].productname });
            }
            return acc;
        }, []);

        checkedItemIds.forEach(({ id, pcode, productname }) => {
            apiCall(`/api/cart/delete?id=${id}&pcode=${pcode}`, "DELETE", null, null)
                .then(response => {
                    alert(`${productname} Delete Success`);
                })
                .catch(error => {
                    alert(`Deleted failed, please try again`)
                    console.error(error);
                });
        });
    }


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

    // 주문 페이지로 이동
    function orderConfirm() {
        if (window.confirm('Are you sure you want to go to the purchase page?')) {
            // 체크된 상품들만을 필터링하여 새로운 배열에 추가
            const selectedItems = items.filter((item, index) => selectCheck[index]);
            
            // 선택된 상품들이 있는지 확인
            if (selectedItems.length > 0) {
                // 주문 페이지로 이동하며 선택된 상품들을 함께 전달
                navigate('/Order', { state: { items: selectedItems } });
            } else {
                alert('Please select a product.');
            }
        }
    }

    // 장바구니 비어있을 시, 홈화면으로 이동
    function continueConfirm() {
        navigate('/')
    }

    return (
        <div className='CartListFromDiv'>
            <h1 style={{ color: ' #7de4ff' }}>Cart</h1>

            <div className='container'>
                {items.length !== 0 && (
                    <>
                        <label>
                            <input type="checkbox" onChange={checkSelectAll} checked={selectAll} />
                            <span style={{ color: '#FE7CF3' }}>Select All</span>
                        </label>
                        <button onClick={deleteHandler}>Delete</button>
                    </>
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
                        <span className='xi-cart'></span>
                        <span>Your shopping cart is empty.</span>
                    </div>
                )}
            </div>

            <div className='popkornBtnbox'>
                {items.length !== 0 ? (
                    <>
                        {/* <Link to="/order" state={{ items: items.filter((item, index) => selectCheck[index]?.checked) }}> */}
                        <PopkornBtn btnName={'Order Execution!'} btntype={false} btnfun={orderConfirm} />
                        {/* </Link> */}
                    </>
                ) :
                    <>
                        <PopkornBtn btnName={'Continue shopping!'} btntype={true} btnfun={continueConfirm} />
                    </>
                }
            </div>

        </div>
    )
}
