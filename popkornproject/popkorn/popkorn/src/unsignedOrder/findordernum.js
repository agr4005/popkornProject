import React, { useState, useEffect } from "react";
import { apiCall } from "../service/apiService";
import { emCheck } from '../auth/logincheck';

function OrderDetailsPopup({ order, onClose }) {
  return (
    <div className="orderpopup-overlay">
      <div className="order-details-popup">

        <h2>Order Details</h2>
        <p>Order Number:<span className="inquiryorderspan"> {order.merchantUid}</span></p>
        <p>Email: {order.buyerEmail}</p>
        <p>Paid At: {new Date(order.paidAt).toLocaleString()}</p>
        <button onClick={onClose} className="inquirypopup-close-btn">X</button>
      </div>
    </div>
  );
}

export default function FindOrderNum() {
  const [ecertificationcode, setEcertificationcode] = useState('');
  const [mailcode, setMailcode] = useState('');
  const [inputemail, setInputemail] = useState('');
  const [ecertificationcheck, setEcertificationcheck] = useState(1);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailConfirmClicked, setIsEmailConfirmClicked] = useState(false);
  const [checkmerchantuid, Setcheckmerchantuid] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [emailinfo, setEmailinfo] = useState('');

  const certificationhandle = (e) => {
    setEcertificationcode(e.target.value);
  }

  const handleEmailChange = (e) => {
    const newEmailValue = e.target.value;
    setInputemail(newEmailValue);
    const isValidEmail = emCheck(newEmailValue);

    if (!isValidEmail && newEmailValue.length > 0) {
      setEmailinfo('Invalid Email type');
    } else {
      setEmailinfo('');
    }
  }

  useEffect(() => {
    let asynccheck = true;

    const checkEmailExistence = async () => {
      try {
        const response = await apiCall(`/api/orderdetail/emailcheck?emailinput=${inputemail}`, "GET", null, null);
        if (asynccheck) {
          setIsEmailValid(!response.data);
          if (response.data) {
            setEmailinfo('Email already exists. If you are a member, please use MyPage');
          } else {
            setEmailinfo('');
          }
        }
      } catch (error) {
        console.error('Error occurred while checking email existence:', error);
        if (asynccheck) {
          setIsEmailValid(true);
        }
      }
    };

    if (inputemail && emCheck(inputemail)) {
      checkEmailExistence();
    }

    return () => {
      asynccheck = false;
    };
  }, [inputemail]);


  const mailConfirm = async () => {
    try {
      const response = await apiCall('/api/user/mailConfirm', "POST", { email: inputemail }, null);
      alert("Please check your certification code in your email.");
      setMailcode(response.data);
      console.log(response.data);
      setIsEmailConfirmClicked(true);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiCall(`/api/orderinfo/findByEmail?email=${inputemail}`, 'GET', null, null);
        const sortedOrders = response.data.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
        setOrders(sortedOrders.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    if (isEmailConfirmClicked) {
      fetchOrders();
    }
  }, [inputemail, isEmailConfirmClicked]);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleMailcodeCheck = () => {
    alert(`Ecertification Complete`);
    setEcertificationcheck(2);
  }

  const emailToMerchantUid = async () => {
    try {
      const response = await apiCall(`/api/orderinfo/findByEmail?email=${inputemail}`, "GET", null, null);
      handleMailcodeCheck();
      Setcheckmerchantuid(response);
    } catch (error) {
      console.error('Error occurred while fetching orders by email:', error);
    }
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      {ecertificationcheck === 1 ?
        <>
          <div>
            <h2 className='memberguide'>
              Certification Email
            </h2>
          </div>

          <div className='confirmemail'>
            Please proceed after sending <br />
            And checking email certification

            <br /><br />

            <input
              className='inputemail'
              type="text"
              placeholder="Insert Email"
              maxLength="20"
              onChange={handleEmailChange}
              value={inputemail}
            />

            {!isEmailValid || !emCheck(inputemail) || inputemail.length === 0 || inputemail.length > 20 ? null :
              <button onClick={mailConfirm} className="mailcodesend"><i className="xi-send" /></button>
            }
            <div className="existedemail">
              {emailinfo}
            </div>
          </div>

          {isEmailConfirmClicked &&
            <>
              <input
                className="inputcertification"
                type="text"
                placeholder="Certification Code"
                onChange={certificationhandle}
                maxLength={12}
              />

              {(ecertificationcode !== mailcode || ecertificationcode.length < 1) ? null :
                <button onClick={emailToMerchantUid} className="mailcodesend"><i className="xi-send" /></button>
              }
            </>
          }
        </>

        : ecertificationcheck === 2 ?
          <>
            <div>
              <h2 className='memberguide'>
                Here's your Order Number
              </h2>
              <h3>For non-members, only 10 recent orders will be printed</h3>
              <div>
                <ul>
                  {orders.map((order, index) => (
                    <li key={index} className="ordernumberlist">
                      <span>Order Number:<span className="inquiryorderspan"> {order.merchantUid}</span></span>
                      <button onClick={() => showOrderDetails(order)} className="inquiryorderdetailstn">Details</button>
                    </li>
                  ))}
                </ul>
                {selectedOrder && (
                  <OrderDetailsPopup order={selectedOrder} onClose={handleClosePopup} />
                )}
              </div>
            </div>

          </>

          : null}
    </>
  );
}
