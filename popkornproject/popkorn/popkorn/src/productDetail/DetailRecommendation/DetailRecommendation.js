import { useState } from "react";

import './DetailRecommendation.css';

const pDate = {
    productinformation: "상품정보(데이터)",
    odannouncement: "주문 및 배송 안내(데이터)",
    egodannouncement: "교환 및 환불 안내(데이터)"
};

//외부로 내보내기
export default function DetailRecommendation() {
    //데이터 저장 : useState('보관할 자료')
    const [title, settitle] = useState(null);

    // 제목 클릭 시 '닫힘','열림' 에 대한 이벤트Handler
    const titleHandler = (notitle) => {
        settitle((title) => (title === notitle ? null : notitle));
    };



    return (
        <>
            <div className="titlehandler">
                <h4 onClick={() => titleHandler(0)}
                    className="titlehover">Product information</h4>
                <h4 onClick={() => titleHandler(1)}
                    className="titlehover">Order and Delivery Notice</h4>
                <h4 onClick={() => titleHandler(2)}
                    className="titlehover">Exchange and refund guidance</h4>
            </div>
            {/* 사용 할 <자식컴포넌트명={state이름} /> */}
            {<InformationModel title={title} />}
        </>
    );
}

//props로 부모컴포넌트 -> 자식컴포넌트 state 전송 
function InformationModel(props) {
    if (props.title === 0) {
        return <div className="recommendation">{pDate.productinformation}</div>;
    }
    if (props.title === 1) {
        return <div className="recommendation">{pDate.odannouncement}</div>;
    }
    if (props.title === 2) {
        return <div className="recommendation">{pDate.egodannouncement}</div>;
    }
    return null;
}
