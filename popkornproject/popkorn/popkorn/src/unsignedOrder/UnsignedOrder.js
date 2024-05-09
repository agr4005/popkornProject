
import { useState } from "react";
import "./UnsignedOrder.css"
import Mainlogo from "../header/logo/Mainlogo/Mainlogo";
import Findorderinfo from "./findorderinfo";
import { apiCall } from "../service/apiService";
import Inquiryorderlist from "./inquiryorderlist";

export default function UnsugnedOrder() {

    const [showpw, setShowpw] = useState(false);
    const [unsignedorder, setUnsignedorder] = useState(1);
    const [ordernum, setOrdernum] = useState('');
    const [orderpw, setOrderpw] = useState('');

    const certificationordernum = (e) => {
        const newValue = e.target.value;
        // 특수 기호가 포함된 경우, 해당 입력 값을 무시하고 이전 값으로 설정
        if (/[^a-zA-Z0-9_]/.test(newValue)) {
            alert('Korean or Special characters cannot be included')
            setOrdernum('');
            return;
        }
        // @ 기호가 포함된 경우, 해당 입력 값을 무시하고 이전 값으로 설정
        if (newValue.includes('@')) {
            alert('Korean or Special characters cannot be included')
            setOrdernum('');
            return;
        }
        // 조건을 만족하는 경우, 입력 값을 설정
        setOrdernum(newValue);
    }
    

    const certificationorderpw = (e) => {
        setOrderpw(e.target.value);
    }

    const resetroute = () => {
        setUnsignedorder(1);
    }
    const certificationroute = () => {
        setUnsignedorder(2);
    }

    const gotoorderlist = () => {
        setUnsignedorder(3)
    }

    const toggleShowpw = () => {
        showpw === false ? setShowpw(true) : setShowpw(false);
    }

    const inquiryhandle = async () => {
        try {
          const response = await apiCall('/api/orderdetail/inquiry', 'POST', {
            emailinput: ordernum,
            pwinput: orderpw
          }, null);
          if (response.data === "Login failed") {
            alert('Invalid Information. Please check your OrderNUmber or Password.');
            setOrdernum('');
            setOrderpw('');
          } else {
          alert(`Ecertification Complete`);
          gotoorderlist();
          }
        } catch (error) {
          console.error('로그인 중 오류 발생:', error);
        }
      }

      const inquirycheck = () => {
        if (!ordernum || !orderpw) {
            return false;
        } else {
            return true;
        }
      }

    return (
        <div className="unsignedO_wrap">
            <div className="Memberbg">
                <div className='emailwhole'>
                    <Mainlogo />
                    <div className='emailbg'>
                        <h2 className='memberguide'>
                            <div>Order Inquiry</div>
                        </h2>

                        {unsignedorder === 1 ?
                            <>
                                <div className="inputcontainer">

                                    <div className='emaildetail'>
                                        <br />

                                        <input
                                            className='emailinput'
                                            type="text"
                                            placeholder="Insert Order Number"
                                            maxLength="25"
                                            onChange={certificationordernum}
                                            value={ordernum}
                                        />
                                    </div>

                                    <div className='orderpwdetail'>
                                        <br />

                                        <input
                                            className='pwinput'
                                            type={showpw === false ? "password" : "text"}
                                            placeholder="Order Password"
                                            maxLength="10"
                                            onChange={certificationorderpw}
                                            value={orderpw}
                                        />

                                        <button onClick={toggleShowpw} className='toggleshow'>
                                            {showpw ? <i className='xi-eye-off' /> : <i className='xi-eye' />}</button>
                                        <button type='reset' className='memberreset' onClick={() => setOrderpw('')}>
                                            <i className='xi-close-thin' /></button>

                                    </div>
                                    <div className='pwinfo'></div>
                                </div>
                                <button className='embtn' onClick={inquiryhandle} disabled={inquirycheck ? false : true}>Search Order</button><br /><br />
                                <br />
                                <button className='resetpw' onClick={certificationroute}>
                                    forgot OrderNumber or password?
                                </button>
                            </>
                            : unsignedorder === 2 ? 
                            <Findorderinfo/>
                            : unsignedorder === 3 ? 
                            
                            <Inquiryorderlist ordernum={ordernum}/>
       
                            : null}
                    </div>
                    {unsignedorder < 2 ? null :
                    <button onClick={resetroute}className='embtn'>To Order Inquiry Page</button>}
                </div>
            </div>
        </div>
    );
}