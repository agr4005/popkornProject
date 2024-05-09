import TypeIt from "typeit-react";
import ListForm from "../modules/ListForm";
import SearchForm from "../modules/SearchForm";

import "./user.css";
import { useState, useEffect } from 'react';
import { apiCall } from "../../../service/apiService";

export default function UserList() {
    const [pageState, setPageState] = useState(1);
    const [currKeyword, setCurrKeyword] = useState("");
    const [data, setDataState] = useState({
        userList: {
            content: []
        },
        pageData: {
            page: 1,
            size: 20,
            prev: false,
            next: false,
            start: 0,
            end: 0,
            pageList: [1],
            totalPage: 0
        },
        totalcnt: 0,
        signedcnt: 0,
        unsignedcnt: 0
    });

    useEffect(() => {
        apiCall(`/api/user/searchlist?page=${pageState}&size=20&keyword=${currKeyword}`, "GET", null, null)
            .then(response => {
                setDataState({
                    ...response.data, pageData: {
                        page: response.data.page,
                        size: response.data.size,
                        prev: response.data.prev,
                        next: response.data.next,
                        start: response.data.start,
                        end: response.data.end,
                        pageList: response.data.pageList,
                        totalPage: response.data.totalPage
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [pageState, currKeyword]);



    return (
        <div className="userlist_wrap">
            <div className="userlist_container">
                <div className="userlist_header">
                    <TypeIt options={{ loop: false }} className="userlist_type">User List</TypeIt>
                </div>
                <div className="userlist_statistical">
                    <div><span>TOTAL USERS</span><span>{data.dashboard1 + data.dashboard2 + data.dashboard3}</span></div>
                    <div><span>SIGNED USERS</span><span>{data.dashboard2}</span></div>
                    <div><span>UNSIGNED USERS</span><span>{data.dashboard3}</span></div>
                </div>
            </div>
            <div className="admincategory_wrap">
                <SearchForm setCurrKeyword={setCurrKeyword} entity={"user"} />
            </div>
            <ListForm data={data.dtoList} setDataState={setDataState} setPageState={setPageState} pk={"id"} entity={"user"} pageData={data.pageData} />
        </div>
    );
}