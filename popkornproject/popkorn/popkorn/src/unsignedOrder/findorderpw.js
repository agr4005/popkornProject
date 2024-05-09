import React, { useState, useEffect } from "react";
import { apiCall } from "../service/apiService";
import { emCheck } from '../auth/logincheck';
import Orderpwchanges from "./orderpwchange";

export default function FindOrderpw() {
  const [ecertificationcode, setEcertificationcode] = useState('');
  const [mailcode, setMailcode] = useState('');
  const [inputemail, setInputemail] = useState('');
  const [ecertificationcheck, setEcertificationcheck] = useState(1);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [viewEmail, setviewEmail] = useState(false);
  const [isEmailConfirmClicked, setIsEmailConfirmClicked] = useState(false);
  const [checkmerchantuid, Setcheckmerchantuid] = useState([]);
  const [emailinfo, setEmailinfo] = useState('');
  const [ordernuminput, setordernuminput] = useState('');

  const certificationhandle = (e) => {
    setEcertificationcode(e.target.value);
  }

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

  const handleordernumcheck = (e) => {
    setordernuminput(e.target.value);
  }

  const verifyOrderNumber = async () => {
    try {
      const response = await apiCall(`/api/orderinfo/findByMerchantUid?merchantUid=${ordernuminput}`, "GET");
      if (ordernuminput != response.data[0].merchantUid) {
        setEmailinfo("Order number not found. Please enter a valid order number.");
        setviewEmail(false);
      } else {
        setEmailinfo("");
        setviewEmail(true);
      }
    } catch (error) {
      setEmailinfo("Invalid order number.");
      setviewEmail(false);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiCall(`/api/orderinfo/findByEmail?email=${inputemail}`, 'GET', null, null);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    if (isEmailConfirmClicked) {
      fetchOrders();
    }
  }, [inputemail, isEmailConfirmClicked]);

  const handleMailcodeCheck = () => {
    alert(`Ecertification Complete`);
    setEcertificationcheck(2);
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

  const emailToMerchantUid = async () => {
    try {
      const response = await apiCall(`/api/orderinfo/findByEmail?email=${inputemail}`, "GET", null, null);
      handleMailcodeCheck();
      Setcheckmerchantuid(response);
    } catch (error) {
      console.error('Error occurred while fetching orders by email:', error);
    }
  };

  useEffect(() => {
    if (ordernuminput.length > 0) {
      verifyOrderNumber();
    } else {
      setviewEmail(false);
    }
  }, [ordernuminput]);

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
              className='inputordernum'
              type="text"
              placeholder="Insert Order Number"
              maxLength="20"
              onChange={handleordernumcheck}
              value={ordernuminput}
            />
            {viewEmail || !emCheck(inputemail) || inputemail.length === 0 || inputemail.length > 20 ? null :
              <button onClick={mailConfirm} className="mailcodesend"><i className="xi-send" /></button>
            }
            
            {viewEmail ? <input
              className='inputemail'
              type="text"
              placeholder="Insert Email"
              maxLength="20"
              onChange={handleEmailChange}
              value={inputemail}
            /> : null}

            {!isEmailValid || !emCheck(inputemail) || inputemail.length === 0 || inputemail.length > 20 ? null :
              <button onClick={mailConfirm} className="mailcodesend"><i className="xi-send" /></button>
            }
          </div>

          <div className="existedemail">
            {emailinfo}
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

              {ecertificationcode !== mailcode || ecertificationcode.length < 1 ? null :
                <button onClick={() => { emailToMerchantUid(); viewEmail(); }} className="mailcodesend"><i className="xi-send" /></button>
              }
            </>
          }
        </>

        : ecertificationcheck === 2 && viewEmail ?
          <Orderpwchanges ordernuminput={ordernuminput} />

          : null}
    </>
  );
}
