import React, { useState } from 'react';
import PrevNextButtons from "./prevnextbtn";
import DisableprevNextButtons from './disableprevnextbtn';

export function JoinNickname(props) {
    const [nickname, setNickname] = useState('');
    const [checkNicknameVali, setcheckNicknameVali] = useState(false);

    const [join, setJoin] = props.joinState;

    const nicknamehandle = (e) => {
        const value = e.target.value;
        setNickname(value);
        setcheckNicknameVali(nicknamevali(value));
    };

    const nicknamevali = (nickname) => {
        const regex = /^[a-zA-Z0-9]{6,12}$/;
        return regex.test(nickname);
    };

    const updateJoin = (newJoin) => {
        setJoin(prevJoin => ({
            ...prevJoin,
            ...newJoin
        }));
    };

    const updatenickname = () => {
        updateJoin({ nickname: nickname });
    };

    return (
        <>
            <div>
                <h2 className='memberguide'>
                    <div>Please enter your NickName</div>
                </h2>
                <h3 className='subguide'>
                    <div>Nickname is 6-12 characters long and<br /> can be changed later in the account setting<br />
                        Only English and numbers should be used in Nickname
                    </div>
                </h3>
            </div>

                <input
                    className='nickname'
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={nicknamehandle}
                    minLength={6}
                    maxLength={12}
                />
                <button type='button' className='memberreset' onClick={() => setNickname('')}><i className='xi-close-thin' /></button>

            <div className='nicknameinfo' style={{ color: !checkNicknameVali || nickname === "" ? "#fe7cf3" : "#7de4ff" }}>
                {!checkNicknameVali || nickname === "" ? "Invalid nickname" : "Valid nickname"}
            </div>
            {!checkNicknameVali ? <DisableprevNextButtons onPrevClick={props.backjoinbutton} /> 
            : <PrevNextButtons onPrevClick={props.backjoinbutton} onNextClick={() => {props.joinbutton(); updatenickname();}} />}
        </>
    )
}
