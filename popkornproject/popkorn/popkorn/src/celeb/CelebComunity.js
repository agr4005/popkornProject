import { useEffect, useState } from "react";
import "./CelebComunity.css";
import { useLocation } from "react-router-dom";
import { apiCall } from "../service/apiService";
import Header from './../header/Header';
import Footer from './../footer/Footer';

export default function CelebComunity() {

   const imgSrc = process.env.PUBLIC_URL + "/celebIMG/"
   const userid = sessionStorage.getItem('loginID');
   const Location = useLocation();
   const celeb = Location.state;
   const [dialoges, setDialoges] = useState([]);
   const [totalCount, setTotalCount] = useState(0);
   const [inputText, setInputText] = useState('');

   useEffect(() => {

      apiCall(`/api/member/celebcommunity/celebfeeds?artist=${celeb.artist}`, "GET", null, sessionStorage.getItem('token'))
         .then(response => {
            setDialoges(response.data)
         })
         .catch(err => {
            if (err === 403) {
               alert('Please use the service after logging in.');
               window.history.back();
            }
         })

      apiCall(`/api/member/likey/countbyartist?artist=${celeb.artist}`, "GET", null, sessionStorage.getItem("token"))
         .then(response => setTotalCount(response.data))
         .catch(err => {
            if (err === 403) {
            }
         })

   }, [])

   const handleClick = () => {
      apiCall(`/api/member/celebcommunity/insert`, "POST", {
         id: sessionStorage.getItem('loginID'),
         nickname: sessionStorage.getItem('nickname'),
         artist: celeb.artist,
         content: inputText,
         regdate: new Date(),
      }, sessionStorage.getItem('token'))
         .then(response => {
            setDialoges(response.data)
            setInputText("") // 전송 후 textare 초기화
         })
         .catch(err => {
            if (err === 403) {
               alert('Please use the service after logging in.');
               window.history.back();
            }
         })
   }


   const handlerEnter = (e) => {
      if (e.keyCode === 13) {
         handleClick();
      }
   }

   return (
      <>
         <Header />
         <div className="celeb_comunity_wrap">
            <div className="celeb_feed_wrap">
               <span className="celeb_feed_totallikey">Total Likey<i className="xi-star"></i> : </span>&nbsp;<span className="celeb_feed_totallikey_cnt">{totalCount}</span>
               <img src={imgSrc + celeb.celebimg} alt="" className="celeb_feed_logo" />
               <div className="celeb_feed_container">
                  <div className="celeb_feed_notice">
                     <div className="celeb_feed_notice_div">
                        <span>{celeb.notice}</span>
                     </div>
                  </div>
                  <div className="celeb_feed_content">
                     <div className="celeb_feeds_wrap">
                        {
                           dialoges.map((dialoge, index) =>
                              <div key={index} className={`celeb_feeds_div ${userid === dialoge.id ? 'user_feed' : ''}`}>
                                 <span className={`celeb_feeds_id`}>{dialoge.nickname}</span>
                                 <span className={`celeb_feeds_contents`}>{dialoge.content}</span>
                                 <span className={`celeb_feeds_time`}>{dialoge.regdate}</span>
                              </div>
                           )
                        }
                     </div>
                  </div>
                  <div className="celeb_feed_input_wrap">
                     <div>
                        <textarea cols="30" rows="10" className="celeb_feed_textarea" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handlerEnter}></textarea>
                        <button className="celeb_feed_btn" onClick={handleClick}>submit</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
}