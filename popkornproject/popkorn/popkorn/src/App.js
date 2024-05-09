import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './Main';
import ProductPage from './productPage/ProductPage';
import MyPageMain from './auth/mypage/mypagemain';
import AuthMain from './auth/AuthMain';
import TBBtn from './useModules/TBBtn'
import AdminMain from './admin/AdminMain';
import UnsignedOrder from './unsignedOrder/UnsignedOrder'

import './App.css';
import ProductDetail from './productDetail/ProductDetail';
import Cart from './Cart/Cart';
import Order from './order/Order';

import { useContext, useEffect, useState } from 'react';
import React from 'react';
import  {OrderComplete}  from './order/OrderComplete';
import { apiCall } from './service/apiService';
import Refund from './refund/Refund';
import CelebListPage from './celeb/CelebListPage';
import CelebComunity from './celeb/CelebComunity';
import QnaBoard from './qnaboard/qnaboard';


// 로그인 상태는 Session 전역으로 관리함. 
// Session의 상태를 표현하는 useState를 Boolean 값으로 설정해둠
// 만약 false 일 경우엔 지정된 경로가 아닌 로그인 경로 컴포넌트를 전달
// 로그인 상태 확인 후 진행되어야 할 페이지

export const Logincontext = React.createContext();


function App() {

  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
   const storedLoginID = sessionStorage.getItem('loginID');

apiCall(`/api/user/selectone?id=${storedLoginID}`, "GET", null, null)
  .then(response => {
    if (storedLoginID === response.data.id && response.data.status === 'admin') {
      setIsloggedIn(true);
      setIsAdmin(true);
    } else if (storedLoginID === response.data.id) {
      setIsloggedIn(true);
    }
  })
  .catch(err => {
    console.log("Invalid login credentials.=>" + err);
  });

  }, []);

  useEffect(() => {
    sessionStorage.setItem('loginCheck', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Logincontext.Provider value={[isLoggedIn, setIsloggedIn]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Main}></Route>
          <Route path="/productpage" Component={ProductPage}></Route>
          <Route path="/mypagemain" element={isLoggedIn ? <MyPageMain isAdmin={isAdmin} /> : <AuthMain />}></Route>
          <Route path="/auth" Component={AuthMain}></Route>
          <Route path="/productdetail" Component={ProductDetail}></Route>
          <Route path="/cart" Component={Cart}></Route>
          <Route path="/order" Component={Order}></Route>
          <Route path='/authmain' element={<AuthMain />}></Route>
          <Route path="/ordercomplete" Component={OrderComplete}></Route>
          <Route path='/adminmain' element={<AdminMain />}></Route>
          <Route path='/unsignedorder' Component={UnsignedOrder}></Route>
          <Route path='/qnaboard' Component={QnaBoard}></Route>
          <Route path='/celeblistpage' Component={CelebListPage}></Route>
          <Route path='/celebcomunity' Component={CelebComunity}></Route>
          <Route path='/refund' Component={Refund}/>
        </Routes>
      </BrowserRouter>
      <TBBtn/>
    </Logincontext.Provider>
  );
}

export default App;
