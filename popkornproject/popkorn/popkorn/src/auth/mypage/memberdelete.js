import { useState } from 'react';
import './memberdelete.css';
import { apiCall } from '../../service/apiService';

export const Memberdelete = () => {

    const [withdrawalinput, setWithdrawalinput] = useState('');
    const withdrawalkeyword = 'agree to withdrawal';

    const withdrawalcheck = (e) => {
        setWithdrawalinput(e.target.value);
    }

    const withdrawalvali = () => {
        if (withdrawalinput === withdrawalkeyword) {
            if (window.confirm('Are you really withdraw Popkorn ID?')) {
                alert("Withdrawal Procedure Complete. Thank you for using PopKorn.");
                return true;
            } else 
            alert('Withdrawal Procedure Cancel.')
            return false;
        }
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0); 
};

const withdraw = async () => {
    try {
        const userId = sessionStorage.getItem('loginID');
        const request = {"userId" : userId}
        const response = await apiCall('/api/user/withdraw', "DELETE" , request, null);
        if (response.status === 200) {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('오류 발생:', error);
    }
}

    return (
        <div className="withdrawalwhole">
            <div className="account-header">
                Membership Withdrawal
            </div>
            <div className="withdrawalguide">
                This is Membership Withdrawal.<br />
                If you wish to withdrawal the membership, please be aware of the following.
            </div>
            <div className="withdrawal-container">

                <div className="withdrawal-content">
                    <div className='withdrawal-header'>
                        Precautions
                    </div>
                    <br />
                    <ul>
                        <li><i className='xi-check-circle' />
                            &nbsp;  If you withdrawal PopKorn service, your PopKorn history, PopKorn nickname, and service activity history will be deleted and will not be restored.
                        </li> <br />
                        <li><i className='xi-check-circle' />
                            &nbsp; Account information cannot be recovered when withdrawaling the service, and if you re-join with the same account afterwards, account information cannot be recovered before withdrawaling.
                        </li> <br />
                        <li><i className='xi-check-circle' />
                            &nbsp; Previously written posts and comments will be deleted when you withdrawal the service.
                        </li> <br />
                        <li><i className='xi-check-circle' />
                            &nbsp;If you withdraw from the membership, it may be difficult to check the product you have already purchased, check the delivery, or return it.
                        </li>

                    </ul>

                </div>
            </div>
            If you fully understand and agree to the precautions, please enter the phrase below yourself.
            <div className="withdrawal-check">
                agree to withdrawal
            </div>
            <div className='withdrawal-recheck'>
                <input type='text'
                    className='withdrawalinput'
                    maxLength={20}
                    value={withdrawalinput}
                    onChange={withdrawalcheck}
                    placeholder='input the same message above' />
            </div>
                <button className='withdrawal-completebtn' onClick={() => {withdrawalvali() && withdraw()}} disabled={withdrawalinput !== withdrawalkeyword}>Withdraw</button>
        </div>

    );
};

export default Memberdelete;