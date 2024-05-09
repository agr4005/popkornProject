import React, { useState, useEffect } from 'react';
import './myaccountinfo.css';
import { UseTerms } from './useTerms';
import { apiCall } from '../../service/apiService';

const Myaccountinfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [email] = useState(sessionStorage.getItem('loginID'));
  const [nickname, setNickname] = useState('');
  const [rewords, setrewords] = useState('')

  useEffect(() => {
    const fetchNicknameAndReword = async () => {
      try {
        const response = await apiCall(`/api/user/${email}/nickname-reword`, "GET", null, null);
        if (response.status === 200) {
          const { nickname, reword } = response.data;
          setNickname(nickname);
          setrewords(reword);
        } else {
          console.log('닉네임 및 리워드 가져오기 실패');
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    };
  
    if (email) {
      fetchNicknameAndReword();
    }
  }, [email]); //
  

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const updatenickname = async () => {
    try {
      const response = await apiCall(`/api/user/updatenickname?nickname=${nickname}&email=${email}`, "POST" , null, null);
      if (response.status === 200) {
        setNickname(response.data);
        return true;
      } else {
        console.log('닉네임 변경 실패');
        return false;
      }
    } catch (error) {
      console.error('오류 발생:', error);
      return false;
    }
}

  return (
    <div className="my-account-info">
      <div className="account-header">
        My Account Information
      </div>
      <button 
    onClick={() => { 
        
            if (nickname.length >= 6 && nickname.length <= 12) {
                toggleEditMode();
                updatenickname();
            } else {
                alert("Nickname must be between 6 and 12 characters long.");
            }
        
    }} 
    className='toggleupdate' 
    disabled={!(nickname.length >= 6 && nickname.length <= 12)}>
    {editMode ? 'Save' : 'Modify'}
</button>


      <div className='accountemail'>
        Email &nbsp;

        <span>{email}</span>

      </div>

      <div className='accountnickname'>
        Nickname &nbsp;
        {editMode ? (
          <input value={nickname} onChange={handleNicknameChange} className='editnickname' maxLength={12} minLength={6}/>
        ) : (
          <span>{nickname}</span>
        )}
      </div>

      <div className='accountnickname'>
        rewords &nbsp;
          <span>{rewords}</span>
        <br /><br />
      </div>

      <br />
      <div className='termsheader'>
        Terms and conditions
      </div>
      <UseTerms />
    </div>
  );
};

export default Myaccountinfo;
