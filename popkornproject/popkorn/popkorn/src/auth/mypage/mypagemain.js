import React, { useState } from 'react';
import './mypagemain.css';
import Myaccountinfo from './myaccountinfo';
import Mypasswordchanger from './mypasswordchanger';
import Orderlist from './orderlist';
import Memberdelete from './memberdelete';
import Customerservice from './customerservice';
import { Link } from 'react-router-dom';
import Mypagebasic from './mypagebasic';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';

export const MyPageMain = (Props) => {
    const [showpage, setShowpage] = useState('');
    const [activeButton, setActiveButton] = useState('');

    const showmypage = (buttonName) => {
        if (activeButton === buttonName) {
            setShowpage('');
            setActiveButton(null);
        } else {
            setActiveButton(buttonName);
            setShowpage(buttonName === "My Account" ? '1' :
                buttonName === "Change password" ? '2' :
                    buttonName === "Orderlist" ? '3' :
                        buttonName === "Membership Withdrawal" ? '4' :
                            buttonName === "Customer Service" ? '5' : ''
            );
        }
    };

    return (
        <div className='mypagewhole'>
            <Header/>
            <div className="accountinfo">
                <div className='accountcontent'>
                    <span className='accountcontent_span1'>Welcome to popKorn!</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>{sessionStorage.getItem('loginID')}</span>
                </div>
            </div>
            <div className='mypageflex'>
                <div className='mypageside'>
                    <ul>
                        <li className='mypagesmallheader'>My Page</li>
                        <div className='sidebarrightborder'>
                            <li>
                                <button onClick={() => showmypage('My Account')} className={activeButton === 'My Account' ? 'mypageactive' : ''}>
                                    My Account
                                </button>
                            </li>
                            <li>
                                <button onClick={() => showmypage('Change password')} className={activeButton === 'Change password' ? 'mypageactive' : ''}>
                                    Change Password
                                </button>
                            </li>
                            <li>
                                <button onClick={() => showmypage('Orderlist')} className={activeButton === 'Orderlist' ? 'mypageactive' : ''}>
                                    My Order List
                                </button>
                            </li>
                            <li>
                                <button onClick={() => showmypage('Membership Withdrawal')} className={activeButton === 'Membership Withdrawal' ? 'mypageactive' : ''}>
                                    Membership Withdrawal
                                </button>
                            </li>
                                <li>
                                    <button onClick={() => showmypage('Customer Service')} className={activeButton === 'Customer Service' ? 'mypageactive' : ''}>
                                        Customer Service
                                    </button>
                                </li>
                            {Props.isAdmin ?
                                <li>
                                    <Link to='/AdminMain'>
                                        <button className="mypagetoadminpage">
                                            <span>Admin</span><i className="xi-home-o"></i><span>Page</span>
                                        </button>
                                    </Link>
                                </li>
                                : null
                            }
                        </div>
                    </ul>
                </div>
                <div className='mypagecomponunt'>
                    {showpage === '1' ? <Myaccountinfo /> : showpage === '2' ? <Mypasswordchanger /> : showpage === '3' ? <Orderlist /> :
                        showpage === '4' ? <Memberdelete /> : showpage === '5' ? <Customerservice /> : <Mypagebasic />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyPageMain;
