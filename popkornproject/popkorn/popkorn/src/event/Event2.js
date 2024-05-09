import "./Event2.css";
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useEffect, useState } from "react";


import { apiCall } from "../service/apiService";
import { format } from 'date-fns';

export default function Event2() {
   const imageSrc = process.env.PUBLIC_URL + "/event2IMG/";

   const [eventData, setEventData] = useState([]);
   const [modalOpen, setModalOpen] = useState(false);
   const [item, setItem] = useState({});
   const modalBackground = useRef();

   useEffect(() => {
      apiCall(`/api/event/eventlist`, "GET", null, null)
         .then(response => {
            setEventData(response.data);
         })
         .catch(err => {
            console.log("Event2 apiCall ERROR => " + err);
         });
   }, []);

   const dots = "●";

   const settings = {
      dots: false,
      infinite: true,
      speed: 700,
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      adaptiveHeight: true,
      variableWidth: true,
      draggable: true,
      responsive: [
         {
            breakpoint: 1500,
            settings: {
               slidesToShow: 2
            }
         },
         {
            breakpoint: 700,
            settings: {
               slidesToShow: 1
            }
         }
      ]
   };

   return (
      <div className="event2_wrap">
         <div>
            <Slider {...settings}>
               {eventData.map((item, i) => (
                  <div key={i} className="event2_slide_container" onClick={() => {
                     setItem(item)
                     setModalOpen(true)
                  }}>
                     <img src={imageSrc + item.image1} alt="event2_IMG" className="event2_IMG" />
                     <span className="event2_span1">{item.title}</span><br></br>
                     <span className="event2_span2">{format(item.startdate,"yyyy-MM-dd")}~{format(item.enddate,"yyyy-MM-dd")}</span>
                  </div>
               ))}
            </Slider>
            {modalOpen && (
               <div className="event_modal_wrap" ref={modalBackground} onClick={e => {
                  if (e.target === modalBackground.current) {
                     setModalOpen(false);
                  }
               }}>
                  <div className="event_modal_container">
                     <div className="event_modal_content">
                        <img src={imageSrc + item.content}></img>
                     </div>
                     <button className="event_modal_close_btn" onClick={() => setModalOpen(false)}>닫기</button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
