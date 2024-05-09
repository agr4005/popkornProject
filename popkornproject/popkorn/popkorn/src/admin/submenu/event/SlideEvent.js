import { useEffect, useState } from "react";
import "./SlideEvent.css";
import { apiCall } from "../../../service/apiService";
import {format} from 'date-fns'
import TypeIt from "typeit-react";

export default function SlideEvent() {
    // Delete
    const [eventData, setEventData] = useState([]);
    const imageSrc = process.env.PUBLIC_URL + "/event2IMG/";
    // Insert
    const [eventAddList, setEventAddList] = useState([]);
    const [imageURL, setImageURL] = useState("");
    const [contentURL, setContentURL] = useState("");
    const noimage = process.env.PUBLIC_URL + "/noimage.png";
    const [imageFile, setImageFile] = useState(null);
    const [contentFile, setContentFile] = useState(null);

    const [title, setTitle] = useState("");
    const [startdate, setStartDate] = useState(new Date());
    const [enddate, setEndDate] = useState(new Date());

    const handleEventImageUpload = (e) => {
        const file1 = e.target.files[0]; // 사용자가 선택한 첫 번째 파일을 가져오는 것

        if (file1) {
            setImageFile(file1) // 이미지 파일을 상태(State)에 설정
            const imageURL1 = URL.createObjectURL(file1)
            // createObjectURL: 임시로 생성되는 URL, 객체에 대한 참조로 사용될 수 있으며, 해당 URL을 사용하여 객체를 다운로드 하거나 미리보기 등 작업 수행 가능
            setImageURL(imageURL1);
        } else {
            setImageFile(null);
            setImageURL('');
        }
    };

    const handleEventContentUpload = (e) => {
        const file2 = e.target.files[0]; // 사용자가 선택한 첫 번째 파일을 가져오는 것

        if (file2) {
            setContentFile(file2) // 이미지 파일을 상태(State)에 설정
            const contentURL1 = URL.createObjectURL(file2)

            setContentURL(contentURL1);
        } else {
            setContentFile(null);
            setContentURL('')
        }

    }

    const handleStartDateChange = (e) => {
        // input 요소의 값을 그대로 상태 업데이트
        const newValue = e.target.value;
        setStartDate(newValue);
        console.log(newValue)
    };

    const handleEndDateChange = (e) => {
        // input 요소의 값을 그대로 상태 업데이트
        const newValue = e.target.value;
        setEndDate(newValue);
    };


    const insertEventListHandler = () => {
        const newItem = {
            title: title,
            startdate: format(startdate,"yyyy-MM-dd") , 
            enddate: format(enddate,"yyyy-MM-dd"),
            image1: imageURL,
            content: contentURL,
            imageFile: imageFile,
            contentFile: contentFile
        };

        setEventAddList([...eventAddList, newItem]);
    }

    // 전체 삭제
    const eventDeleteAll = () => {
        setEventAddList([]);
    }

    // xi-close
    const handleEventInsertDelete = (index) => {
        const updatedEventList = [...eventAddList];
        updatedEventList.splice(index, 1); // 해당 인덱스의 항목을 배열에서 제거
        setEventAddList(updatedEventList); // 상태 업데이트
    }

    // Event data DB 저장
    const datatoServer = () => {

        eventAddList.map((item, i) => {
            const formdata = new FormData();

            // FormData 객체에 새로운 키 - 값 추가 
            formdata.append(`title`, item.title);
            formdata.append(`startdate`, item.startdate);
            formdata.append(`enddate`, item.enddate);
            formdata.append(`type`, 2);
            formdata.append(`image1`, item.image1.substring(item.image1.lastIndexOf('/') + 1));
            formdata.append(`content`, item.content.substring(item.content.lastIndexOf('/') + 1));
            formdata.append(`imageFile`, item.imageFile);
            formdata.append(`contentFile`, item.contentFile);

            apiCall('/api/manager/event/eventSave', 'POST', formdata, sessionStorage.getItem('token')).then(response => {
                if (response.data) {
                    alert(`Upload Success Event FileName => ${item.image1}&${item.content}`);
                } else {
                    alert(`Upload Failde Event FileName => ${item.image1}&${item.content}`)
                }
            }).catch(err => {
                alert('Editing and deleting are possible from "MANAGER" authority and above.');
            })

        })

    }

    useEffect(() => {
        apiCall(`/api/event/eventlist`, "GET", null, null).then(response => {
            setEventData(response.data);
        }).catch(err => {
            console.log("SlideEvent apiCall ERROR => " + err);
        });
    }, []);

    const eventDelete = (ecode) => {
        apiCall(`/api/manager/event/deleteByecode?ecode=${ecode}`, "GET", null, sessionStorage.getItem('token')).then(response => {
            setEventData(response.data);
        }).catch(err => {
            alert('Editing and deleting are possible from "MANAGER" authority and above.');
        })
    }

    return (
        <div className="slideevent_wrap">
            <div className="event2_header">
                <TypeIt options={{ loop: false }} className="event2list_type">Add Event</TypeIt>
            </div>
            <div className="event2_deleteList_wrap">
                <div className="event2_deliteList_content">
                    <table className="event2_delete_table">
                        <thead>
                            <tr key="-1">
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th>Thumbnail</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="event2_deleteList_container">
                            {
                                eventData.map((item, i) => (
                                    <tr key={i}>
                                        <td className="event2_checkbox_container">
                                            <input type="checkbox" />
                                        </td>
                                        <td>
                                            <img src={imageSrc + item.image1} alt="event2_IMG" className="event2_deleteList_image" />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.startdate}~{item.enddate}</td>
                                        <td><i className='xi-trash' onClick={() => eventDelete(item.ecode)}></i></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="event2_insert_wrap">
                <div className="event2_image_input">
                    <img src={imageURL || contentURL ? (imageURL || contentURL) : noimage} alt="Upload Image" />
                    <div className="event2_input_wrap">
                        <span>Thumbnail File</span>
                        <input type="file" onChange={handleEventImageUpload} />
                        <span>Content File</span>
                        <input type="file" onChange={handleEventContentUpload} />
                        <span>Title</span>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <span>StartDate</span>
                        <input type="date" value={startdate} onChange={handleStartDateChange} />
                        <span>EndDate</span>
                        <input type="date" value={enddate} onChange={handleEndDateChange} />
                        <div className="event_btnAll_wrap2">
                            <button type="button" className="event_insert_btn" onClick={insertEventListHandler}>Insert</button>
                        </div>
                    </div>
                </div>
                <div className="event2_list_wrap">
                    <span>Event List</span>
                    <div className="event2_list_contents">
                        <ul>
                            {
                                eventAddList.map((item, index) => (
                                    <li key={index} className="event2_list_li">
                                        <img src={item.image1 ? item.image1 : noimage} alt="Event" />
                                        <img src={item.content ? item.content : noimage} alt="Event" />
                                        <p>{item.imageURL}</p>
                                        <p>{item.contentURL}</p>
                                        <p>{item.title}</p>
                                        <p>{item.startdate}</p>
                                        <p>{item.enddate}</p>
                                        <p><i className="xi-close" onClick={() => handleEventInsertDelete(index)}></i></p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="event2_btnAll_wrap2">
                        <button type="reset" className="event2_reset_btn" onClick={eventDeleteAll}>Erase All</button>
                        <button type="button" className="event2_insert_btn" onClick={datatoServer}>Add DB</button>
                    </div>
                </div>
            </div>
        </div>




    );
}

