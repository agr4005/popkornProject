import React, { useState, useEffect } from 'react';
import PrevNextButtons from "./prevnextbtn";
import DisableprevNextButtons from './disableprevnextbtn';
import { apiCall } from '../../service/apiService';

export default function Ecertification(props) {

    const [ecertificationcode, setEcertificationcode] = useState('');
    const [mailcode, setMailcode] = useState('');

    const [join, setJoin] = props.joinState;

    const certificationhandle = (e) => {
        setEcertificationcode(e.target.value);
    }

    const memberjoin = async () => {
        try {
            const Response = await apiCall('/api/user/memberjoin', 'POST', {
                id: join.id,
                password: join.password,
                nickname: join.nickname
            }, null);
            if (Response.status === 200) {
                console.log('회원가입 성공');
            } else {
                console.log('회원가입 실패');
            }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };    
    useEffect(() => {
        mailConfirm();
    }, []);
    
    const mailConfirm = async () => {
        try {
            const Response = await apiCall('/api/user/mailConfirm',"POST", { email: props.emailinput }, null);
            console.log('인증코드:', Response.data);
            setMailcode(Response.data);
            alert("Please check your certification code in your email.");
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    return (
        <>
            <div>
                <h2 className='memberguide'>
                    <div>Certification Email</div>
                </h2>
            </div>

            <div className='confirmemail'>
                Account : {props.emailinput} <br />
            </div>
            <div className="subguide">
                Please proceed after sending <br />
                And checking email cerfitication
            </div>

            <form>
                <br></br>
                <input className="certificationinput"
                    type="text"
                    placeholder="Certification Code"
                    value={ecertificationcode}
                    onChange={certificationhandle}
                    maxLength={12}
                />
            </form>
            {(ecertificationcode !== mailcode || ecertificationcode.length < 1) ? <DisableprevNextButtons onPrevClick={props.backjoinbutton} />
                : <PrevNextButtons onPrevClick={props.backjoinbutton} onNextClick={() => { props.joinbutton(); memberjoin(); }} />}
        </>
    )
}