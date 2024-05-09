import { useEffect, useState } from "react";
import TypeIt from "typeit-react";
import SearchForm from "../modules/SearchForm";
import { apiCall } from "../../../service/apiService";
import './orderList.css';
import AdminPaging from "../modules/AdminPaging";
const imageSrc = process.env.PUBLIC_URL + "/productIMG/";

const OrderItem = ({ order, onClick, editMode, setEditMode, toggleEdit }) => {
   const [infostatus, setInfostatus] = useState(order.status);

   const handleStatusChange = (event) => {
      setInfostatus(event.target.value);
   };

   const updateStatus = async (order) => {
      if(infostatus==='Refund'){
         try {
            const response = await apiCall(`/api/manager/pay/refund`, "POST", order, sessionStorage.getItem('token'));
            if (response.status=== 200) {
               toggleEdit(); 
            const newstatus = response.data;
            return newstatus;
            } else {
               console.log('상태 업데이트 실패:', response.statusText);
               return false;
            }
         } catch (error) {
            alert('Changing order status requires "MANAGER" permission or higher.');
            setInfostatus(order.status);
            return false;
         }
      }
   }

   const handleUpdate = async () => {
      const success = await updateStatus(order);
      if (success) {
         order.status = infostatus;
      }
   };

   return order ? (

      <div className='adminorderlistcontainer' >
         <div className='orderlist1st'>
            <div className='adminorderdetaildate'>
               Order date : {new Date(order.paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
            </div>

            {editMode == true ? (

               <div className="adminorderbtn">
                  <select value={infostatus} onChange={handleStatusChange} className="adminorderliststatus">
                     <option value="Refund">Refund</option>
                     <option value="refund request">refund request</option>
                  </select> &nbsp;
                  <button className='adminorderdetailcheck' onClick={() => handleUpdate(order)}>Save</button> &nbsp;
                  <button className='adminorderdetailcheck' onClick={() => onClick(order)}>Detail</button>
               </div>

            ) : (

               <div className="adminorderbtn">
                  <span className="adminorderliststatus">[ {order.status}  ]</span> &nbsp;
                  <button className='adminorderdetailcheck' onClick={toggleEdit}>Edit</button> &nbsp;
                  <button className='adminorderdetailcheck' onClick={() => onClick(order)}>Detail</button>
               </div>

            )}
         </div >
         <div className='orderlist2nd'>
            <div className='adminorderdetailnumber'>
               Order Number : <span className="adminordernum">{order.merchantUid}</span>
            </div>
            <div>
               Buyer Email: {order.buyerEmail} <br />
               Buyer name: {order.buyerName} <br />
               Address: {order.buyerAddr} <br />
               Phone: {order.buyerTel}<br />

            </div>
         </div>
      </div >
   ) : null
}

export default function RefundList() {
   const [editModes, setEditModes] = useState({});
   const [editMode, setEditMode] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [orders, setOrders] = useState([]);
   const [selectedOrder, setSelectedOrder] = useState(null);
   const [orderDetails, setOrderDetails] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const ordersPerPage = 5;
   const [currCategoryl, setCurrCategoryl] = useState('all');
   const [currKeyword, setCurrKeyword] = useState('');
   const categoryl = ['all', 'merchantUid', 'buyerEmail', 'buyerTel']
   const [orderData, setOrderData] = useState({
      servData: [],
      pageData: {
         page: 1,
         size: 20,
         prev: false,
         next: false,
         start: 0,
         end: 0,
         pageList: [1],
         totalPage: 0
      }
   });

   const toggleEdit = (merchantUid) => {
      setEditModes(prev => ({
         ...prev,
         [merchantUid]: !prev[merchantUid]
      }));
   };

   useEffect(() => {
      setEditMode(false);
   }, [currentPage]);

   const popupClick = (order) => {
      if (order) {
         apiCall(`/api/orderdetail/orderlist?merchantUid=${order.merchantUid}`, "GET", null, null)
            .then(response => {
               setOrderDetails(response.data);
               setSelectedOrder(order);
               setShowPopup(true);
            }).catch(err => console.log(err));
      }
   };

   const closePopup = () => {
      setShowPopup(false);
      setOrderDetails([]);
      setSelectedOrder(null);
   };

   useEffect(() => {
      apiCall(`/api/orderinfo/searchRefundlist?searchType=${currCategoryl}&keyword=${currKeyword}&page=${currentPage}`, "GET", null, null)
         .then(response => {
            setOrderData({
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
            });
            const newEditModes = {};
            response.data.dtoList.forEach(order => {
               newEditModes[order.merchantUid] = false; 
            });
            setEditModes(newEditModes);
         })
         .catch(err => {
            console.error('Error loading data:', err);
         });
   }, [currCategoryl, currKeyword, currentPage, ordersPerPage]);


   useEffect(() => {
      if (orderData.servData.length > 0) {
         setOrders(orderData.servData);
      } else {
         setOrders([]);
      }
   }, [orderData.servData]);

   return (
      <div className="adminorderwhole">
         <div className="adminOrderlist_container">
            <div className="adminOrderlist_header">
               <TypeIt options={{ loop: false }} className="productlist_type">Refund List</TypeIt>
            </div>
         </div>
         <div className="admincategory_search">
            <div>
               <select onChange={(e) => {
                  setCurrCategoryl(e.target.value);
                  setCurrentPage(1);
               }}>
                  {
                     categoryl.map((category, index) =>
                        <option value={category} key={index}>{category}</option>
                     )
                  }
               </select>

            </div>
            <SearchForm setCurrKeyword={setCurrKeyword} setCurrentPage={setCurrentPage} showButton={false} />
            <div className="keywordresult">
               {currKeyword.length !== 0 ?
                  (<span>result of searching with [&nbsp;<span className="focuskeyword">{currKeyword}</span>&nbsp;]</span>)
                  : null}
            </div>
            <>
            {orderData.servData.map(order => (
                  <OrderItem
                     key={order.merchantUid}
                     order={order}
                     onClick={popupClick}
                     editMode={editModes[order.merchantUid]}
                     toggleEdit={() => toggleEdit(order.merchantUid)}
                  />
               ))}
            </>

            {showPopup && selectedOrder && (
               <div className="orderpopup-overlay">
                  <div>
                     <div className='adminorderdetailscontainer'>
                        <div className='orderlist1st'>
                           <div className='adminorderdetaildate'>Order date : <br />{new Date(selectedOrder.paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>
                           <div className='adminorderdetailpcode'>Order number : <span>{selectedOrder.merchantUid}</span></div>
                        </div>
                        {orderDetails.map((orderDetail, index) => (
                           <div className='adminorderdetailproductinfo' key={index}>
                              <div className='adminorderdetailinfo'>
                                 <div className='adminorderdetailimg'><img src={imageSrc + orderDetail.image1} alt="product" /></div>
                                 <div className='productmapvalue'>
                                    <div className='adminorderdetailpname'>{orderDetail.productname}</div>
                                    <div className='adminorderdetailalternative'>{orderDetail.alternative}</div>
                                    <div className='adminorderdetailcount'>{orderDetail.detailcount} EA / {orderDetail.price}￦</div>
                                 </div>
                              </div>
                           </div>
                        ))}
                        <div className='orderlist3rd'>
                           <div className='ordertotalprice'>
                              Total amount : {orderDetails.reduce((total, orderDetail) => total + (orderDetail.price * orderDetail.detailcount), 0)} ₩
                           </div>
                        </div>
                        <button className="popup-close-btn" onClick={closePopup}>X</button>
                     </div>
                  </div>
               </div>
            )}
            <div className='ordernum_paging'>
            <AdminPaging pageData={orderData.pageData} setPageState={setCurrentPage} />

            </div>
         </div>
      </div >
   );
}