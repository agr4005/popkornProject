import { useEffect, useState } from "react";

import Menulist from "./menulist/Menulist";
import Logo from "./logo/Logo";
import Icons from "./icons/Icons";

import "./Header.css";

export default function Header() {
   
   const [isScrolled, setIsScrolled] = useState(false);
   const [checkWidth, setcheckWidth] = useState(false);

   const [isMoveScrolled, setIsMoveScrolled] = useState(0);

   function moveScrolled() {
      if (isMoveScrolled !== window.scrollY) {
         try{
            document.querySelector('.header_wrap').classList.add('fade-out');
            document.querySelector('.menu_wrap').classList.add('fade-out');
            document.querySelector('.icons_wrap').classList.add('fade-out');
            document.querySelectorAll('.logo_imgs1').forEach(e => e.classList.add('fade-out'));
            document.querySelectorAll('.logo_imgs2').forEach(e => e.classList.add('fade-out'));
            document.querySelector('.dimmer').classList.add('fade-out');
            document.querySelector('.categoryS_container').classList.add('fade-out');
            document.querySelector('.categoryM_container').classList.add('fade-out');
            document.querySelector('.categoryS_container').classList.remove('active');

         } catch(e){
            
         }
      }
   }

   const handleLogoMouseOver = () => {
      if (window.scrollY !== 0 || window.innerWidth <= 700) {
         // fade-out 클래스를 삭제하는 로직 추가

         document.querySelectorAll('.fade-out').forEach(element => element.classList.remove('fade-out'));

         setIsMoveScrolled(window.scrollY);

         window.addEventListener('scroll', moveScrolled);
      }
   };


   // const handleScroll = () => {
   //    setScrollY(window.scrollY);
   // };

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY !== 0);
         setcheckWidth(window.screenX < 1300)
      };

      // 스크롤 이벤트 리스너 추가
      window.addEventListener('scroll', handleScroll);

      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <div className={`header_wrap ${isScrolled?"fade-out":""} `}>
         <div className={`dimmer  ${isScrolled?"fade-out":""} `}></div>
         <Menulist isScrolled={isScrolled}/>
         <Logo isScrolled={isScrolled} handleLogoMouseOver={handleLogoMouseOver} />
         <Icons isScrolled={isScrolled} />
      </div>
   );

}