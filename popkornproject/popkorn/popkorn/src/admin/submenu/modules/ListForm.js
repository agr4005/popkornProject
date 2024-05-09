import React from 'react';
import { useState } from 'react';

import "./ListForm.css";
import { apiCall } from '../../../service/apiService';
import AdminPaging from './AdminPaging';

// 공통된 컬럼 추출
function extractCommonColumns(data) {
   if (!Array.isArray(data) || data.length === 0) return [];

   // 첫 번째 데이터 항목의 속성을 기준으로 초기화
   const commonColumns = Object.keys(data[0]);

   return commonColumns;
}

export default function ListForm({ data, setDataState, pk, entity, pageData, setPageState }) {

   const [tooltipContent, setTooltipContent] = useState(null);  // ellipse 를 표현하기위한 tooltip state
   const commonColumns = extractCommonColumns(data);
   const imageSrc = process.env.PUBLIC_URL + `/${entity}IMG/`
   const [isUpdate, setIsUpdate] = useState(false);
   const [updateItem, setUpdateItem] = useState();
   const [inputData, setInputData] = useState([]);
   const [isAdmin, setIsAdmin] = useState(false);

   if (!Array.isArray(data) || data.length === 0) {
      return <div className='listform_nodata'>No data provided.</div>;
   }

   const handleCellMouseEnter = (content) => {
      setTooltipContent(content);
   };

   const handleCellMouseLeave = () => {
      setTooltipContent(null);
   };

   const deleteDate = (id) => {
      apiCall(`/api/manager/${entity}/delete?${pk}=${id}`, "DELETE", null, sessionStorage.getItem('token'))
         .then(response => {
            setPageState(response.data.page);
         })
         .catch(error => {
            alert('Editing and deleting are possible from "MANAGER" authority and above.');
         });
   }

   const updateHandler = (item) => {
      if (isUpdate) {
         // 데이터 업데이트 로직 수행

         const updatedItem = {}; // item 객체의 복사본을 만듭니다.
         commonColumns.forEach((columnName, index) => {
            updatedItem[columnName] = inputData[index]; // 각 필드에 inputData의 값을 할당합니다.
         });
         
         apiCall(`/api/manager/${entity}/update`, "POST", updatedItem, sessionStorage.getItem('token'))
            .then(response => {
               setUpdateItem(response.data)
               setIsUpdate(false)

               if(entity==="user"){
                  // 데이터 업데이트 후 해당 데이터 다시 가져오기
                  apiCall(`/api/${entity}/searchlist?page=1&size=20&keyword=`, "GET", null, null)
                      .then(response => {
                        console.log(response.data.dtoList)
                       setDataState({
                          ...response.data.dtoList,
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
                       });
                       setPageState(response.data.page);
                      })
                      .catch(error => {
                          console.error('Error fetching updated data:', error);
                      });
                     } else if (entity ==='product') {
                  apiCall(`/api/${entity}/searchlist?categoryl=all&categorym=&page=1&size=20&keyword=`, "GET", null, null)
                      .then(response => {
                        setDataState({
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
                      })
                      .catch(error => {
                          console.error('Error fetching updated data:', error);
                      });
               }
            })
            .catch(err => {
               setIsUpdate(false);
               alert('Editing and deleting are possible from "MANAGER" authority and above.')
            });
            
      } else {

         const inputArray = new Array(commonColumns.length)

         commonColumns.map((column, index) => inputArray[index] = item[column])

         setInputData(inputArray)
         setUpdateItem(item[pk])
         setIsUpdate(true)
      }
   }

   const inputHandelr = (e, colIndex) => {

      inputData[colIndex] = e.target.value
      setInputData([...inputData])

   }

   return (
      <div className='listform_container'>
         <div className="listform_wrap">
            <table className="listform_table">
               <thead>
                  <tr key="-1">
                     <th>
                        <input type="checkbox" />
                     </th>
                     {commonColumns.map((columnName, index) => (
                        <th key={index}>
                           {columnName}
                           <i className="xi-caret-down-min"></i>
                        </th>
                     ))}
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody className='tbody'>
                  {data.map((item, rowIndex) => (
                     <tr key={rowIndex}>
                        <td className='checkboxcontainer'>
                           <input type="checkbox" />
                        </td>

                        {commonColumns.map((columnName, colIndex) => (
                           <td key={colIndex}>{
                              updateItem === item[pk] && isUpdate ?
                                 <input className="list_form_input" key={colIndex} value={inputData[colIndex]} readOnly={columnName === 'id' || columnName === 'pcode' || columnName === 'password' || columnName === 'image1' || columnName === 'createdate' ? true : false}
                                    onChange={(e) => inputHandelr(e, colIndex)}
                                 ></input>
                                 :
                                 columnName === "image1" ?
                                    <div className='list_form_img_div'>
                                       <img className='list_form_img' src={imageSrc + item[columnName]} alt={item[columnName]}></img>
                                       <span>{item[columnName]}</span>
                                    </div>
                                    :
                                    columnName !== "status" && columnName !== "categoryl" ? (
                                       <span
                                          title={`${item[columnName]}`}
                                          onMouseEnter={() => handleCellMouseEnter(item[columnName])}
                                          onMouseLeave={handleCellMouseLeave}>{item[columnName]}</span>
                                    ) : (
                                       <div className={`status ${item[columnName].toLowerCase()}`}><span title={`${item[columnName]}`}
                                          onMouseEnter={() => handleCellMouseEnter(item[columnName])}
                                          onMouseLeave={handleCellMouseLeave}
                                       >{item[columnName]}</span>
                                       </div>
                                    )}
                           </td>
                        ))}
                        <td>
                           {isUpdate && updateItem === item[pk] ? <i className='xi-check' onClick={() => updateHandler(item)} ></i> : <i className='xi-pen-o' onClick={() => updateHandler(item)} ></i>}
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           <i className='xi-trash' onClick={() => deleteDate(item[pk])}></i>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className='listform_pagenation'>
            <AdminPaging pageData={pageData} setPageState={setPageState} />
         </div>
      </div>
   );
}