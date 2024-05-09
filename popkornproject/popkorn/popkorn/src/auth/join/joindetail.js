import React, { useState } from 'react';
import "./join.css";
import { charRegex, specialRegex, letterRegex, numRegex } from "./joinRegex";
import PrevNextButtons from './prevnextbtn';
import DisableprevNextButtons from './disableprevnextbtn';

export default function Joindetail(props) {
    const [newpassword, setNewpassword] = useState('');
    const [pwconfirm, setpwconfirm] = useState('');
    const [showpw, setShowpw] = useState(false);
    const [showcheckpw, setShowcheckpw] = useState(false);

    const [join, setJoin] = props.joinState;

    const pwvalidationhandle = (e) => {
        const newpwValue = e.target.value;
        setNewpassword(newpwValue);
    }

    const pwconfirmHandler = (e) => {
        setpwconfirm(e.target.value);
    }

    const toggleShowpw = () => {
        showpw === false ? setShowpw(true) : setShowpw(false);
    }

    const toggleShowcheckpw = () => {
        showcheckpw === false ? setShowcheckpw(true) : setShowcheckpw(false);
    }

    const pwfinalcheck = () => {
        if (charRegex(newpassword) && specialRegex(newpassword) && letterRegex(newpassword) && numRegex(newpassword)) {
            return true;
        } else {
            return false;
        }
    }

    const updateJoin = (newJoin) => {
        setJoin(prevJoin => ({
            ...prevJoin,
            ...newJoin
        }));
    };

    const updatepw = () => {
        updateJoin({ password: newpassword });
    };

    return (
        <>
            <div>
                <h2 className='memberguide'>
                    <div>Please enter your New Password</div>
                </h2>
            </div>
            <div className='newpassword'>
                <br />
                <form>
                    <input
                        className='newpw'
                        type={showpw === false ? "password" : "text"}
                        placeholder="New Password"
                        value={newpassword}
                        onChange={pwvalidationhandle}
                        maxLength={16}
                    />
                    <button onClick={toggleShowpw} className='toggleshow' type='button'>
                        {showpw === false ? <i className='xi-eye' /> : <i className='xi-eye-off' />}</button>
                    <button type='reset' className='memberreset' onClick={() => setNewpassword('')}><i className='xi-close-thin' /></button>
                    <div className='pwvalid1' style={{ color: charRegex(newpassword) ? "#7de4ff" : "#fe7cf3" }}>
                        {charRegex(newpassword) || newpassword.length < 1 ? "" : !charRegex(newpassword) ? "Password must be 8 to 16 characters long." : null}
                    </div>
                    <div className='pwvalid3' style={{ color: letterRegex(newpassword) ? "#7de4ff" : "#fe7cf3" }}>
                        {letterRegex(newpassword) || newpassword.length < 1 ? "" : !letterRegex(newpassword) && charRegex(newpassword) ? "Password must contain at least one lowercase letter in English" : null}
                    </div>
                    <div className='pwvalid4' style={{ color: numRegex(newpassword) ? "#7de4ff" : "#fe7cf3" }}>
                        {numRegex(newpassword) || newpassword.length < 1 ? "" : !numRegex(newpassword) && charRegex(newpassword) && letterRegex(newpassword) ? "Password must contain at least one number." : null}
                    </div>
                    <div className='pwvalid2' style={{ color: specialRegex(newpassword) ? "#7de4ff" : "#fe7cf3" }}>
                        {specialRegex(newpassword) || newpassword.length < 1 ? "" : !specialRegex(newpassword) && charRegex(newpassword) && letterRegex(newpassword) && numRegex(newpassword) ? "Password must contain at least one special character." : null}
                    </div>
                    <br />
                    <input
                        className='checkpw'
                        type={showcheckpw === false ? "password" : "text"}
                        placeholder="Confirm Password"
                        value={pwconfirm}
                        onChange={pwconfirmHandler}
                        maxLength={16}
                    />
                    <button onClick={toggleShowcheckpw} className='toggleshow' type='button'>
                        {showcheckpw === false ? <i className='xi-eye' /> : <i className='xi-eye-off' />}</button>
                    <button type='reset' className='memberreset' onClick={() => setpwconfirm('')}><i className='xi-close-thin' /></button>
                    <div className='pwvalid1' style={{
                        color: !charRegex(newpassword) || !specialRegex(newpassword) || !letterRegex(newpassword) || !numRegex(newpassword) ? "#fe7cf3"
                            : newpassword === pwconfirm && pwconfirm.length > 7 ? "#7de4ff" : "#fe7cf3"
                    }}>
                        {pwfinalcheck() && pwconfirm.length < 1 ? ""
                            : pwfinalcheck() && newpassword === pwconfirm && pwconfirm.length > 7 ? "Password matching"
                                : pwfinalcheck() && newpassword !== pwconfirm ? "Password mismatch" : null}
                    </div>
                </form>
            </div><br />
            <div className='agreeinfo'>By creating an account, you agree to <br />popKorn's Conditions of Use and Privacy Notice.</div>

            {!(pwfinalcheck() && newpassword === pwconfirm && pwconfirm.length > 7) ? <DisableprevNextButtons onPrevClick={props.backjoinbutton} /> 
            : <PrevNextButtons onPrevClick={props.backjoinbutton} onNextClick={() => {props.joinbutton(); updatepw();}} />}
        </>
    )
}
