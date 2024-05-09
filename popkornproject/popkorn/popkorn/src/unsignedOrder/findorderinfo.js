import { useState } from "react"
import Findordernum from "./findordernum";
import Findorderpw from "./findorderpw";

export default function Findorderinfo () {

  const [findorder , setFindorder] = useState(1);

  function findnumroute() {
    setFindorder(2);
  }

  function findpwroute() {
    setFindorder(3);
  }


    return (
       <div className="findorderinfowhole">

        {
          findorder === 1 ?
          <>
          <h2>
            <div className='memberguide'>Find Order Information</div>
        </h2>
      <div className="findorderbtn">
      <button onClick={findnumroute} className="findnumroute"><i className="xi-tag"></i> &nbsp;I want to Find Order Number</button>
      <button onClick={findpwroute} className="findpwroute"><i className="xi-key"></i> &nbsp;I want to Find Order Password</button>
      </div>
          </>
  : findorder === 2 ?
          <Findordernum/>
  : findorder === 3 ?
          <Findorderpw/>
  : null

}







       </div>

       
    )
}