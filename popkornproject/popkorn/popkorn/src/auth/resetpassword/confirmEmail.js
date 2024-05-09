import React, { useState } from 'react';
import Resetpassword from './resetpassword';
import { apiCall } from '../../service/apiService';

export const ConfirmEmail = (props) => {
    const [ecertificationcode, setEcertificationcode] = useState('');
    const [mailcode, setMailcode] = useState('');
    const [resetstatus, setResetstatus] = useState('1');

    const certificationhandle = (e) => {
        setEcertificationcode(e.target.value);
    }

    const resetprocess = () => {
        if (resetstatus === '1') {
            setResetstatus('2');
        } else if (resetstatus === '2') {
            const confirmed = window.confirm("Are you sure you want to finish resetting your password?");
            if (confirmed) {
                alert('Password Reset Process Complete. Returns to Login page.');
                window.location.href = "/authmain";
                return true;
            } else {
                alert('Please double-check the password and complete it.');
                return false;
            }
        }
    };

    const backprocess = () => {
        if (resetstatus === '1') {
            window.location.href = "/authmain";
        } else if (resetstatus === '2') {
            setResetstatus('1')
        }
    }

    const mailConfirm = async () => {
        try {
            const Response = await apiCall('/api/user/mailConfirm',"POST", { email: props.emailinput }, null);
            console.log('인증코드:', Response.data);
            setMailcode(Response.data);
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    return (
        <>
            {resetstatus === '1' ?
                <>
                    <div>
                        <h2 className='memberguide'>
                            <div>Certification Email <br /> for Reset Password</div>
                        </h2>
                    </div>

                    <div className='confirmemail'>
                        Account : {props.emailinput} <br />
                    </div>
                    <div className="subguide">
                        Please proceed after sending <br />
                        And checking email cerfitication
                    </div>

                    <button className="certificationbtn" onClick={() => {
                        alert("Please check your certification code in your email.");
                        mailConfirm();
                    }}>Click to send certification Code</button>
                    <br /><br />
                    <form>
                        <br></br>
                        <input className="certificationinput"
                            type="text"
                            placeholder="Certification Code"
                            value={ecertificationcode}
                            onChange={certificationhandle}
                        />
                    </form>
                    {(ecertificationcode !== mailcode || ecertificationcode.length < 1)
                        ? <><button className='disableprevbtn' onClick={backprocess}>Prev Step</button>
                            <button className='disablenextbtn' disabled>Next Step</button></>
                        : <><button className='emprevstep' onClick={backprocess}>Prev Step</button>
                            <button className='emnextstep' onClick={resetprocess}>Next Step</button></>}
                </>
                : resetstatus === '2' ?
                    <Resetpassword emailinput={props.emailinput} pwinput={props.pwinput} resetprocess={resetprocess} backprocess={backprocess}/>
                    : null
            }
        </>
    )
}

export default ConfirmEmail;