import { useEffect, useState } from "react";
import "./Notices.css";
import { apiCall } from "../../../service/apiService";

export default function Notices() {

    const [isContent, setIsContent] = useState([]);
    const [inputContent, setInputContent] = useState(""); // textarea 입력값 저장
    const [isAdmin, setIsAdmin] = useState(true);


    useEffect(() => {
        apiCall(`/api/manager/notices/getnotices`, "GET", null, sessionStorage.getItem('token'))
            .then(response => {
                setIsContent(response.data)
            }).catch(() =>
                setIsAdmin(false)
            )
    }, [])

    const handleClick = () => {
        apiCall(`/api/manager/notices/insert`, "POST", { id: sessionStorage.getItem("loginID"), content: inputContent }, sessionStorage.getItem('token'))
            .then(response => {
                setIsContent(response.data)
                setInputContent("") // 전송 후 textare 초기화
            }).catch(() => {
                setIsAdmin(false)
                setInputContent('')
                alert("Permission denied.");
            })
    }

    const textChange = (e) => {
        setInputContent(e.target.value);
    }

    const handlerEnter = (e) => {
        if (e.keyCode === 13) {
            handleClick();
        }
    }

    return (
        <div className="notices_warp">
            <div className="notices_header">
                <span>Notices</span>
                <div className="notices_title">Admin Chat</div>
            </div>
            <div className="notices_body">
                {
                    isAdmin ?
                        isContent.map((item, index) =>
                            sessionStorage.getItem("loginID") === item.id ?
                                <div key={index} className="message_flex">
                                    <div className="my_message">{item.content}</div>
                                    <div className="message_date">{new Date(item.regdate).toLocaleTimeString()}</div>
                                </div>
                                :
                                <div key={index} className="message_flex_others">
                                    <div className="mesaage_id">{item.id}</div>
                                    <div className="others_message_wrap">

                                        <div className="others_message">{item.content}</div>
                                        <div className="message_date">{new Date(item.regdate).toLocaleTimeString()}</div>
                                    </div>
                                </div>
                        )
                        :
                        <div className="notice_notadmin_div">
                            <span>Permission denied</span>
                        </div>
                }
            </div>
            <div className="notices_footer">
                <textarea cols="30" rows="10" className="notices_content" value={inputContent} onChange={textChange} onFocus={textChange} onKeyDown={handlerEnter}>
                </textarea>
                <button className="content_button" onClick={handleClick}>전송</button>
            </div>
        </div>
    );
}

// 1. 500번 오류
// 2. 엔터 전송 불가

