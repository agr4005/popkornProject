import './footer.css';
import Mainlogo from '../header/logo/Mainlogo/Mainlogo';
import { UseTerms } from './mypage/useTerms';
export const Footer = () => {

  return (
    <div className="footer-container">
      <div className="footer-header">
         <UseTerms/>
      </div>
      <div className='footer-flex'>

      <div className="footer-content">
        <dl>
          <dt className='footer-dt'>Project Name :&nbsp;</dt><dd> PopKorn</dd>
          <dt className='footer-dt'>Login, Join, Mypage :&nbsp; </dt><dd>Kim su bin</dd>
          <dt className='footer-dt'>Main, Admin : &nbsp; </dt><dd>Lee Jung Hyuk </dd>
          <dt className='footer-dt'>ProductDetail, Cart :&nbsp; </dt><dd>Lee Hye Na</dd>
          <dt className='footer-dt'>ProductPage :&nbsp;</dt><dd>Jeon Ye won</dd>
        </dl>
      </div>
      <div className='footer-logo'>
      <Mainlogo/>
      </div>
      </div>
    </div>

  );
}

export default Footer;