
import { useEffect, useRef, useState } from "react";
import "./product.css";
import TypeIt from "typeit-react";
import SearchForm from "../modules/SearchForm";
import ListForm from "../modules/ListForm";
import { apiCall } from "../../../service/apiService";

export default function TotalList() {

   const [currCategoryl, setCurrCategoryl] = useState('all');
   const [currCategorym, setCurrCategorym] = useState('all');
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
         pageList: [],
         dashboard1 : 0,
         dashboard2 : 0,
         dashboard3 : 0,
         dashboard4 : 0,
      }
   });
   const categoryListL = ['all', 'album', 'goods', 'photo']
   const categoryListM = {'all':['all'], 'album': ['all'], 'goods' : ['all', 'Official Fanlight', 'Key Ring', 'Phone Case', 'ETC'], 'photo' : ['all', 'Photo Book', 'Photo Card']}

   useEffect(() => {
      apiCall(`/api/product/searchlist?categoryl=${currCategoryl}&categorym=${currCategorym}&page=${pageState}&keyword=${currKeyword}`, "GET", null, null).then(response => {
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
               totalPage: response.data.totalPage,
               dashboard1 : response.data.dashboard1,
               dashboard2 : response.data.dashboard2,
               dashboard3 : response.data.dashboard3,
               dashboard4 : response.data.dashboard4,
            }
         })  
      }).catch(err => {
         console.log("ProductPage axios ERROR=>" + err);
      })

   }, [pageState, currKeyword, currCategorym, currCategoryl])

   return (
      <div className="productlist_wrap">
         <div className="productlist_container">
            <div className="productlist_header">
               <TypeIt options={{ loop: false }} className="productlist_type">Total List</TypeIt>
            </div>
            <div className="productlist_statistical">
               <div><span>TOTAL PRODUCT</span><span>{productData.pageData.dashboard1}</span></div>
               <div><span>ALBUM</span><span>{productData.pageData.dashboard2}</span></div>
            <div><span>GOODS</span><span>{productData.pageData.dashboard3}</span></div>
            <div><span>PHOTO</span><span>{productData.pageData.dashboard4}</span></div>
            </div>
         </div>
         <div className="admincategory_wrap">
            <div>
               <select onChange={(e) => {
                  setCurrCategoryl(e.target.value);
                  setCurrCategorym(categoryListM[e.target.value][0]);
                  setPageState(1);
               }}>
                  {
                     categoryListL.map((category, index)=>
                        <option value={category} key={index}>{category}</option>
                     )
                  }
               </select>
               &nbsp;
               <select onChange={(e) => {
                  console.log(e.target.value)
                  setCurrCategorym(e.target.value)
                  setPageState(1);
               }}>
                  {categoryListM[currCategoryl].map((subcategory, index) =>
                     <option value={subcategory} key={index}>{subcategory}</option>
                  )}
               </select>
            </div>
            <SearchForm setCurrKeyword={setCurrKeyword} setCurrentPage={setPageState} entity={"product"} />
         </div>
         <ListForm data={productData.servData} setDataState={setProductData} pk={"pcode"} entity={'product'} pageData={productData.pageData} setPageState={setPageState} />
      </div>
   )
}