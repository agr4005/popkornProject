
import { useEffect, useState } from "react";
import Header from "../header/Header";
import "./CelebListPage.css"
import { apiCall } from "../service/apiService";
import CelebSlot from "./CelebSlot";
import Footer from './../footer/Footer';


export default function CelebListPage() {

   const [celebList, setCelebList] = useState([]);
   const [likeyList, setLikeyList] = useState([]);

   useEffect(() => {

      apiCall(`/api/celeb/celeblist`, "GET", null, null)
         .then(response => setCelebList(response.data))
         .catch(err => console.log(err))

      if(sessionStorage.getItem('token') !== null){
         apiCall(`/api/member/likey/getlist`, "GET", null, sessionStorage.getItem('token'))
            .then(response => setLikeyList(response.data))
            .catch(err => {
               if (err === 403) {
                  setLikeyList([]);
               } else {
                  console.log(err)
               }
            }
         )
      }
   }, [])

   return (
      <>
         <Header></Header>
         <div className="celeblistpage_wrap">
            <span className="meet_new_celeb_span"><i className="xi-star-o"></i> Meet new Celebs here!</span>
            <div className="celebs_list_container">
               {
                  celebList.map((celeb, index) => {

                     // celeb이 likeyList에 있는지 여부 확인
                     const isLiked = likeyList.some(likey => likey.artist === celeb.artist);

                     return  <CelebSlot key={index} celeb={celeb} isLike={isLiked} setLikeyList={setLikeyList} />
                  }
                  )
               }

            </div>
         </div>
         <Footer/>
      </>
   );
}