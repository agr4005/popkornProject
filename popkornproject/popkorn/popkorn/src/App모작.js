
import logo from './logoIMG/popkorn_logo.svg';
import logo1 from './logoIMG/logo_full.svg';
// import logo2 from './logoIMG/logo_o.svg';
// import logo3 from './logoIMG/logo_p2.svg';
// import logo4 from './logoIMG/logo_o2.svg';
// import logo5 from './logoIMG/logo_r.svg';
// import logo6 from './logoIMG/logo_n.svg';


<div className="App">
<header className="App-header">
  <div className='logo-container'>
    <ul className='header-menu'>
      <li className='menu'>CELELB</li>
      <li className='menu'>PRODUCT</li>
      <li className='menu'>EVENT</li>
    </ul>
    <div>
      <div className='logoIMGs'>
        <img src={logo1} className="logo-context" alt="logo" />
        {/* <img src={logo2} className="logo-context" alt="logo" />
        <img src={logo3} className="logo-context" alt="logo" />
        <img src={logo4} className="logo-context" alt="logo" />
        <img src={logo5} className="logo-context" alt="logo" />
      <img src={logo6} className="logo-context" alt="logo" /> */}
      </div>
    </div>
    <ul className='header-icons'>
      <li><i className='xi-search' ></i></li>
      <li><i className='xi-user-o'></i></li>
      <li><i className='xi-cart-o'></i></li>
      <li><i className='xi-star-o'></i></li>
      <li><i></i></li>
    </ul>
  </div>
      <img src={logo} className="App-logo" alt="logo" />
</header>
</div>