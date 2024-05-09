

import TypeIt from "typeit-react";
import ListForm from "../modules/ListForm";
import SearchForm from "../modules/SearchForm";

import "./user.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiCall } from "../../../service/apiService";

export default function AdminList() {
    const [pageState, setPageState] = useState(1);
    const [data, setDataState] = useState([]);

    useEffect(() => {
        apiCall(`/api/user/adminlist?page=${pageState}&size=20`, "GET", null, null)
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
    }, [pageState]);

    return (
        <div className="userlist_wrap">
            <div className="userlist_header">
                <TypeIt options={{ loop: false }} className="userlist_type">Admin List</TypeIt>
            </div>
            <div className="userlist_statistical">
                <div><span>TOTAL ADMIN</span><span>{console.log(data)}</span></div>
            </div>
            <SearchForm />
            <ListForm data={data} setDataState={setDataState} pk={'id'} entity={'user'} setPageState={setPageState} pageData={data.pageData}/>
        </div>
    );
}