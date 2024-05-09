import { useEffect, useRef, useState } from "react"
import Header from "../header/Header";
import Category from "./category/Category";
import Popkornlogo from "./popkornlogo/Popkornlogo";
import Product from "./product/Product";
import { apiCall } from "../service/apiService";
import Footer from "../footer/Footer";

export default function ProductPage() {
    
    const currCategorylRef = useRef('new');
    const [currCategoryl, setCurrCategoryl] = useState('new');
    const [currCategorym, setCurrCategorym] = useState('New');
    const [currKeyword, setCurrKeyword] = useState('');
    const [pageState, setPageState] = useState(1);
    const [productData, setProductData] = useState({
        servData: [],
        pageData: {
            page: 1,
            size: 0,
            prev: false,
            next: true,
            start: 0,
            end: 0,
            pageList: []
        }
    });

    useEffect(() => {
        apiCall(`/api/product/searchlist?categoryl=${currCategoryl}&categorym=${currCategorym}&page=${pageState}&keyword=${currKeyword}`,"GET",null,null).then(response => {
            setProductData({
                servData: response.data.dtoList,
                pageData: {
                    page: response.data.page,
                    size: response.data.size,
                    prev: response.data.prev,
                    next: response.data.next,
                    start: response.data.start,
                    end: response.data.end,
                    pageList: response.data.pageList,
                    totalPage: response.data.totalPage
                }
            })
        }).catch(err => {
            console.log("ProductPage axios ERROR=>" + err);
        })
    }, [currCategorym, pageState, currCategoryl])

    return (
        <div className="product_page_wrap">
            <Header/>

            <Category currCategorylRef={currCategorylRef} setCurrCategoryl={setCurrCategoryl} setCurrCategorym={setCurrCategorym} setPageState={setPageState} setCurrKeyword={setCurrKeyword}/>

            <Product currCategorylRef={currCategorylRef} setCurrCategoryl={setCurrCategoryl} currCategorym={currCategorym} productData={productData} setPageState={setPageState}/>

            <Popkornlogo/>
            <Footer/>
        </div>
    )
}