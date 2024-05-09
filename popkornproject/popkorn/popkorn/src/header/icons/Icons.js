
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logincontext } from './../../App';
import { apiCall } from "../../service/apiService";
export default function Icons({isScrolled}) {

   const [isLoggedIn, setIsloggedIn] = useContext(Logincontext);
   const [isAdmin, setIsAdmin] = useState(false);

   const loginID = sessionStorage.getItem('loginID');
   const logOut = async () => {
      if (!loginID) {
        return;
      }
    
      try {
        await apiCall('/api/user/logout', "GET", null, null);
        alert("Logged out.");
        sessionStorage.removeItem('loginID');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('nickname');
        setIsloggedIn(false);
        window.location.href='/'
      } catch (error) {
        console.error("Error occurred during logout : ", error);
        return false;
      }
    };

    useEffect(()=>{
      apiCall("/api/user/authcheck", "POST", null, sessionStorage.getItem("token"))
      .then(response => {
        setIsAdmin(response.data)
      })
      .catch()
    }, [])

   return (
      <div className={`icons_wrap ${isScrolled? 'fade-out' : ''}`}>
         <Link to='/adminMain'><i className="xi-home-o"></i></Link>
         <Link to={isLoggedIn?'/MyPageMain':'/AuthMain'}><i className="xi-user-o"></i></Link>
         <Link to="/cart"><i className="xi-cart-o"></i></Link>
         <i className="xi-log-out" onClick={logOut} ></i>
      </div>
   );
}