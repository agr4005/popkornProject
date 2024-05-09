import { apiCall } from "../service/apiService";
import { useState } from "react";

function Qnainsert({ onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Refund');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const insertqna = async () => {
    try {
      if (title.length < 3) {
        alert("title must be at least 3 characters long")
        return;
      } else if (content.length < 1) {
        alert("content must not be blank.")
        return;
      }
      const userConfirmed = window.confirm("Are you sure you want to insert this post?");
      if (userConfirmed) {
        const postData = {
          title: title,
          content: content,
          category: category,
          id: sessionStorage.getItem("loginID")
        };
        const response = await apiCall('/api/qna/insert', 'POST', postData, null);
        if (response.status === 200) {
          alert('Post registered successfully');
          onClose();
          window.location.reload();
        } else {
          throw new Error('Failed to register the post');
        }
      } else {
        alert('Post registration canceled by the user.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  return (
    <>
      <div className="qnaposting-backdrop">
        <button className="qnaclosebtn" onClick={onClose}>X</button>
        <div className="qnaposting-content">
          <div className="insertinfo">

            <select className="insertcategory" value={category} onChange={handleCategoryChange}>
              <option value="Refund">Refund</option>
              <option value="Transaction">Transaction</option>
              <option value="Etc">Etc</option>
            </select>

            Title : <input className='insertTitle' value={title} onChange={handleTitleChange} />
          </div>
          <div className='postingHeader'>
            <div className='postingauthor'>

            </div>
          </div>
          <textarea className='posting-content' value={content} onChange={handleContentChange} />
          <div className='postingConvibtn'>
            <button className="qnaInsertBtn" onClick={insertqna}>Insert</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Qnainsert;
