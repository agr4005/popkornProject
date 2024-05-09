import React, { useState, useEffect } from "react";
import { apiCall } from "../service/apiService";

export default function Orderpwchanges(props) {
  const [showpw, setShowpw] = useState(false);
  const [showconfirmpw, setShowconfirmpw] = useState(false);
  const [pwconfirm, setPwconfirm] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [ordernuminput, setOrdernuminput] = useState(props.ordernuminput);

  useEffect(() => {
    setOrdernuminput(props.ordernuminput);
  }, [props.ordernuminput]);

  const pwValidationHandler = (e) => {
    const newpwValue = e.target.value;
    setNewpassword(newpwValue);
  }

  const toggleShowpw = () => {
    setShowpw(!showpw);
  }

  const toggleShowconfirmpw = () => {
    setShowconfirmpw(!showconfirmpw);
  }

  const pwConfirmHandler = (e) => {
    setPwconfirm(e.target.value);
  }

  const resetpassword = async () => {
    try {
      const request = { "newpassword": newpassword, "ordernuminput": ordernuminput };
      const response = await apiCall('/api/user/resetpassword', "POST", request, null);
      if (response.status === 200) {
        alert('Order number password has been changed.');
        window.location.href = "/unsignedorder";
      } else {
        console.log('Password Change Failed');
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };  

  return (
    <div className="passwordchangerwhole">
      <div>
        <h2 className='memberguide'>
          Reset new password
        </h2>
        <h3>Password reset for Order Number</h3>
      </div>

      <div className="newpasswordreset">
        New Password
        <input type={showpw ? "text" : "password"}
          maxLength={16}
          minLength={8}
          className="newpasswordresetinput"
          onChange={pwValidationHandler}
        />
        <button onClick={toggleShowpw} className='toggleshowpw'>
          {showpw ? <i className='xi-eye-off' /> : <i className='xi-eye' />}
        </button>
      </div>

      <div className="newpasswordreset">
        New Password Confirm
        <input type={showconfirmpw ? "text" : "password"}
          maxLength={16}
          minLength={8}
          className="newpasswordresetinput"
          onChange={pwConfirmHandler}
        />
        <button onClick={toggleShowconfirmpw} className='toggleshowpw'>
          {showconfirmpw ? <i className='xi-eye-off' /> : <i className='xi-eye' />}
        </button>
      </div>

      <button onClick={resetpassword} className="resetpwconfirm" disabled={!(newpassword === pwconfirm && pwconfirm.length > 7)}>Change Password</button>
    </div>
  );
}
