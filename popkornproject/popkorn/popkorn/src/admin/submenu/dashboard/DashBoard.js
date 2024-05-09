import Modal from "../modules/Modal";

import "./DashBoard.css";

export default function DashBoard({dashboards}) {

   return (
      <div className="dashboard_wrap">
         {dashboards.map((dashboard, index) => (    
            <Modal key={index} component={dashboard}/> // 각 요소를 JSX로 감싸서 전달
         ))}
      </div>
   );
}