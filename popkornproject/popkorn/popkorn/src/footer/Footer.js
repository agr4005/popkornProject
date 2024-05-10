import "./Footer.css";
import Mainlogo from '../header/logo/Mainlogo/Mainlogo';
import { UseTerms } from '../auth/mypage/useTerms';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <div className="footer_wrap">
        <div className='footer-flex'>
          <div className="footer-content">
            <div className="footer_menu">
              <Link to="/unsignedorder">
              <span>Unsigned Order</span>
              </Link>
              <Link to="/qnaboard">
              <span>Q & A</span>
              </Link>
            </div>
              <UseTerms />
            <dl>
              <dt className='footer-dt'>프로젝트 명 :&nbsp;</dt><dd> PopKorn</dd>
              <dt className='footer-dt'>담당파트 </dt><br/><dd>
                1. 회원 관련 전반적인 부분(회원가입, 로그인, 마이페이지)<br/>
                2. 관리자 페이지 - 주문목록, 배송, 이메일 <br/>
                3. 비회원 주문 조회<br/>
                4. Q&A 게시판
              </dd>
            </dl>
          </div>
          <div className='footer-logo'>
            <Mainlogo />
          </div>
        </div>
    </div>
  );
}