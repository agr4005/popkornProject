
import ReactDOM from 'react-dom';
import { apiCall } from '../service/apiService';
import { useState } from 'react';
import Qnacomment from './qnacomment';


function Qnaposting({ onClose, post }) {

  const [showModify, setShowModify] = useState(false);
  const [titlevalue, setTitlevalue] = useState(post.title);
  const [contentValue, setContentValue] = useState(post.content);
  const [adminconfirm] = useState(false);

  const toggleModify = async () => {
    if (!showModify) {
      setShowModify(true);
    } else {
      try {
        const response = await apiCall(`/api/qna/${post.sno}`, "PATCH", {
          title: titlevalue,
          content: contentValue,
          sno: post.sno
        }, null);
        if (response.status === 200) {
          setTitlevalue(titlevalue);
          setContentValue(contentValue);
          alert('Post Modify Complete')
          setShowModify(false);
          window.location.reload();
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    }
  }

  const deleteqna = async () => {
    if (!post || !post.sno) {
      console.error('Invalid post data. Unable to delete.');
      return;
    }
    try {
      const userConfirmed = window.confirm("Are you sure you want to delete this post?");
      if (userConfirmed) {
        await apiCall(`/api/qna/${post.sno}`, "DELETE");
        alert('Post deleted successfully');
        onClose();
        window.location.reload();
      } else {
        alert('Post deletion canceled by the user.');
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  }

  const handleTitleChange = (e) => {
    setTitlevalue(e.target.value);
  };

  const handleContentChange = (e) => {
    setContentValue(e.target.value);
  };

  return ReactDOM.createPortal(
    (
      <>
        <div className="qnaposting-backdrop">
          <button className="qnaclosebtn" onClick={onClose}>X</button>
          <div className="qnaposting-content">
            {showModify ?
              <>
                <input className='postingTitle' value={titlevalue} onChange={handleTitleChange} />
                <div className='postingHeader'>
                  <div className='postingauthor'>{post.id}</div>
                  <div className='postingDate'>{new Date(post.postcreated).toLocaleString('ko-KR', {
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit', hour12: false
                  })}</div>
                </div>
                <textarea className='posting-content' value={contentValue} onChange={handleContentChange} />
              </>
              : <>
                <div className='postingTitle'>{titlevalue}</div>
                <div className='postingHeader'>
                  <div className='postingauthor'>{post.id}</div>
                  <div className='postingDate'>{new Date(post.postcreated).toLocaleString('ko-KR', {
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit', hour12: false
                  })}</div>
                </div>
                <div className='posting-content'>
                  {contentValue}
                </div>
              </>
            }
            <div className='postingConvibtn'>
              {post.id === sessionStorage.getItem('loginID') || adminconfirm ?
                <>
                  <button className='qnaModifyBtn' onClick={toggleModify}>
                    {showModify ? 'Save' : 'Modify'}
                  </button>
                  <button className='qnaDeleteBtn' onClick={deleteqna}>Delete</button>
                </>
                : null}
            </div>
            <div className='posting-Footer'>
              <div className='posting-Comment'>
                Comment
              </div>
              <div className='CommentMain'>
                <Qnacomment sno={post.sno} />
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    document.body
  );
}

export default Qnaposting;
