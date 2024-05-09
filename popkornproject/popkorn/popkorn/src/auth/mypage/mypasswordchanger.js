import { useState } from "react";
import './mypasswordchange.css';
import { charRegex, specialRegex, letterRegex, numRegex } from "../join/joinRegex";
import { apiCall } from "../../service/apiService";
export default function Mypasswordchanger() {

        const [passwordrecheck, SetPasswordrecheck] = useState(1);
        const [showpw, setShowpw] = useState(false);
        const [showconfirmpw, setShowconfirmpw] = useState(false);
        const [pwconfirm, setpwconfirm] = useState('');
        const [currentpw, setCurrentpw] = useState('');
        const [newpassword, setNewpassword] = useState('');

        const pwvalidationhandle = (e) => {
                const newpwValue = e.target.value;
                setNewpassword(newpwValue);
        }

        const pwfinalcheck = () => {
                if (charRegex(newpassword) && specialRegex(newpassword) && letterRegex(newpassword) && numRegex(newpassword)) {
                        return true;
                } else {
                        return false;
                }
        }

        const toggleShowpw = () => {
                showpw === false ? setShowpw(true) : setShowpw(false);
        }

        const toggleShowconfirmpw = () => {
                showconfirmpw === false ? setShowconfirmpw(true) : setShowconfirmpw(false);
        }

        const pwrecheckcomple = () => {
                SetPasswordrecheck(passwordrecheck + 1);
        }

        const pwconfirmHandler = (e) => {
                setpwconfirm(e.target.value);
        }

        const cupwconfirmHandler = (e) => {
                setCurrentpw(e.target.value);
        }

        const passwordcheck = async (currentpw) => {
                try {

                        const userId = sessionStorage.getItem('loginID');
                        const request = {"currentpw":currentpw , "userId" : userId}

                        const response = await apiCall('/api/user/passwordcheck', "POST", request , null);
                        if (response.status === 200 && response.data === true) {
                                setShowpw(false);
                                return true;
                        } else {
                                return false;
                        }
                } catch (error) {
                        console.error('오류 발생:', error);
                        return false;
                }
        };

        const handlePasswordCheck = async () => {
                const isPasswordMatch = await passwordcheck(currentpw);
                if (isPasswordMatch) {
                        pwrecheckcomple();
                } else {
                        alert('Password does not match.')
                }
        };

        const redesignpassword = async () => {
                try {
                        const userId = sessionStorage.getItem('loginID');
                        const request = {"newpassword" : newpassword, "userId" : userId}
                        const response = await apiCall('/api/user/redesignpassword', "POST", request , null);
                        if (response.status === 200) {
                                alert('Password has been changed. Please re-Login');
                                sessionStorage.removeItem('loginID');
                                window.location.href = "/";
                        } else {
                                console.log('Password Change Failed');
                        }
                } catch (error) {
                        console.error('오류 발생:', error);
                }
        };

        return (
                <div className="passwordchangerwhole">
                        <div className="account-header">
                                Change Password
                        </div>
                        {passwordrecheck === 1 ?
                                <>
                                        <div className="passwordchangeguide">
                                                Check current password for password change
                                        </div>
                                        <div className="currentpassword">
                                                Current Password
                                                <input type={showpw === false ? "password" : "text"}
                                                        maxLength={16}
                                                        minLength={8}
                                                        value={currentpw}
                                                        className="currentpasswordinput"
                                                        onChange={cupwconfirmHandler}
                                                />
                                                <button onClick={toggleShowpw} className='toggleshowpw'>
                                                        {showpw === false ? <i className='xi-eye' /> : <i className='xi-eye-off' />}</button>
                                                <button onClick={handlePasswordCheck}><i className="xi-send" /></button>
                                        </div>
                                </>
                                :
                                <div>
                                        <div className="passwordchangeguide">
                                                Reset new password
                                        </div>

                                        <div className="newpasswordreset">
                                                New Password
                                                <input type={showpw === false ? "password" : "text"}
                                                        maxLength={16}
                                                        minLength={8}
                                                        className="newpasswordresetinput"
                                                        onChange={pwvalidationhandle}
                                                />
                                                <button onClick={toggleShowpw} className='toggleshowpw'>
                                                        {showpw === false ? <i className='xi-eye' /> : <i className='xi-eye-off' />}</button>
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
                                        </div>
                                        <div className="newpasswordreset">
                                                New Password Confirm
                                                <input type={showconfirmpw === false ? "password" : "text"}
                                                        maxLength={16}
                                                        minLength={8}
                                                        className="newpasswordresetinput"
                                                        onChange={pwconfirmHandler}
                                                />
                                                <button onClick={toggleShowconfirmpw} className='toggleshowpw'>
                                                        {showconfirmpw === false ? <i className='xi-eye' /> : <i className='xi-eye-off' />}</button>
                                                <div className="pwvalid5" style={{
                                                        color: !charRegex(newpassword) || !specialRegex(newpassword) || !letterRegex(newpassword) || !numRegex(newpassword) ? "#fe7cf3"
                                                                : newpassword === pwconfirm && pwconfirm.length > 7 ? "#7de4ff" : "#fe7cf3"
                                                }}> {pwfinalcheck() && pwconfirm.length < 1 ? ""
                                                        : newpassword === pwconfirm && pwconfirm.length > 7 ? "Password matching"
                                                                : pwfinalcheck() && newpassword !== pwconfirm ? "Password mismatch" : null}
                                                </div> </div>
                                        <button onClick={redesignpassword} className="resetpwconfirm" disabled={!(newpassword === pwconfirm && pwconfirm.length > 7)}>Change Password</button>
                                </div>
                        }
                </div >
        )
}