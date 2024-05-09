
import ListForm from "../modules/ListForm";

import "./MainEvent.css";

const data = [{
    ecode : 0,
    startdate : "2023-07-21",
    enddate : "2024-03-15",
    title : "welcome to our popkorn!!",
    content : "push your Celeb with us!!",
    type : 1,
    image : "",
    url : 0
}]

// 1) ListForm 양식
// => 어떤 데이터가 들어오던지 간에 그 데이터의 컬럼 수, 데이터 타입 등을 고려해서 제작
// => 

export default function MainEvent (){
    return (
        <div className="MainEvent_wrap">
            <div>
                Main Event List
            </div>
            <ListForm data={data} />
        </div>
    );
}