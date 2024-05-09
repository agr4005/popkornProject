import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DetailInformation from '../DetailInformation/DetailInformation';
import PopkornBtn from '../../useModules/PopkornBtn'

import "./DetailOrder.css";
import { Logincontext } from './../../App';
import { apiCall } from '../../service/apiService';

export default function DetailOrder() {
    const Location = useLocation();
    const pData = Location.state.item; 
    const [pcode, setPcode] = useState(0);
    const [cnt, setCnt] = useState(0);
    const [totalcnt, setTotalcnt] = useState(0);
    const [selectOption, setSelectOption] = useState("");
    const navigate = useNavigate();
    const [isLoggedIn] = useContext(Logincontext);
    const [alternative, setAlternative] = useState([]);

    const cntPlusHandler = () => {
        if (cnt < 10) {
            setCnt(cnt + 1);
            setTotalcnt(pData.price * (cnt + 1));
        } else {
            alert("You can purchase up to 10 items maximum.");
        }
    }

    const cntMinusHandler = () => {
        if (cnt > 1) {
            setCnt(cnt - 1);
            setTotalcnt(pData.price * (cnt - 1));
        }
    }

    const optionHandler = (e) => {
        const selectedValue = e.target.value; // 선택된 옵션의 값
        const selectedItem = alternative.find(item => item.pcode === parseInt(selectedValue)); // 선택된 값에 해당하는 아이템 찾기

        if (selectedItem) {
            setSelectOption(selectedItem.alternative);
            setPcode(e.target.value);
            pData.price = selectedItem.price;
        } else {
            setSelectOption("");
            setCnt(0);
            setTotalcnt(0);
        }
    }

    const addCart = async () => {
        try {
            await apiCall(`/api/member/cart/addcart`, "POST", {
                id: sessionStorage.getItem('loginID'),
                pcode: pcode,
                detailcount: cnt,
                alternative: selectOption,
                price: pData.price,
                image1: pData.image1,
                productname: pData.productname
            }, sessionStorage.getItem("token"));
            navigate('/cart');
        } catch (error) {
                console.error('Error adding item to cart:', error);
        }
    }

    function cartConfirm() {
        if (isLoggedIn) {
            if (selectOption.length === 0) {
                window.confirm("Please select an option");
            } else {
                if (window.confirm("Do you want add into Cart?")) {
                    addCart();
                }
            }
        } else {
            if(window.confirm("Do you want to log in and use it?")){
                navigate('/authMain');
            };
        }
    }

    function orderConfirm() {
        if (selectOption.length === 0) {
            window.confirm("Please select an option");
        } else if(cnt === 0){
            window.alert("Please select the desired quantity")
        }else { 
            if (window.confirm("Do you want Order?")) {
                const items = [{
                    price: pData.price,
                    image1: pData.image1,
                    pcode: pcode,
                    detailcount: cnt,
                    alternative: selectOption,
                    productname: pData.productname
                }];
                navigate('/order', {state : {items : items, totalprice: totalcnt} });
            }
        }
    }

    useEffect(() => {
        apiCall(`/api/product/selectoption`, "POST", { "productname": pData.productname })
            .then((response) => {
                setAlternative(response.data);
            }).catch(err => console.log(err));
    }, [pData.productname])

    return (
        <div>
            <div className="mainTitle">
                <div className='singerwon'>
                    <p>{pData.artist}</p>
                    <h2>{pData.productname}</h2>
                    <h2>￦{pData.price.toLocaleString()}</h2>
                </div>
                <select id='optionselect' onChange={optionHandler}>
                    <option value={-1}>Please select an option.</option>
                    {alternative.map((item, index) => (
                        <option key={index} value={item.pcode}>{item.alternative}</option>
                    ))}
                </select>
                {selectOption != "" && (
                    <div className='mainButton'>
                        <h6>{selectOption}</h6>
                        <button type="button" className='mainButton1' onClick={cntMinusHandler}>-</button>
                        <h5>{cnt}</h5>
                        <button type="button" className='mainButton1' onClick={cntPlusHandler}>+</button>
                    </div>
                )}
                <div className='total'>
                    <h3>Total({cnt})</h3>
                    <h2>￦{totalcnt.toLocaleString()}</h2>
                </div>
                <div className='maintwoButton'>
                    <PopkornBtn btnName='Cart' btntype={true} btnfun={cartConfirm} />
                    <PopkornBtn btnName='Order' btntype={false} btnfun={orderConfirm} />
                </div>
                <DetailInformation />
            </div>
        </div >
    )
}





