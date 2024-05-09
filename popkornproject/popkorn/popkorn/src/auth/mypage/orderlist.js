import { useState, useEffect } from 'react';
import './orderlist.css';
import { apiCall } from '../../service/apiService';
import { Link } from 'react-router-dom';

const imageSrc = process.env.PUBLIC_URL + "/productIMG/";

const OrderItem = ({ order, onClick }) => {
  return order ? (
    <div className='orderlistcontainer'>
      <div className='orderlist1st'>
        <div className='orderdetaildate'>Order date : {new Date(order.paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>
        <div className='orderdetailcheck' onClick={() => onClick(order)}>Order detail</div>
      </div>
      <div className='orderlist2nd'>
        <div className='orderdetailnumber'>Order Number : <span>{order.merchantUid}</span></div><br />
        Buyer name: {order.buyerName} <br />
        Address: {order.buyerAddr} <br />
        Phone: {order.buyerTel}
        <div className='orderinfostatus'>[ {order.status} ] <br /></div>
      </div>
      <div className='orderbtn'>{
        order.status === 'refund request'?
        <></>
        :
        <Link to="/refund" state={{ id: order.merchantUid }}>
          <button className='refundbtn'>Refund</button>
        </Link>
      }
        <button className='purchaseconbtn'>Purchase Confirm</button>
        <div className='ordertotalprice'>
          Total amount : {order.paidAmount} ₩
        </div>
      </div>
    </div>
  ) : (
    <div> There is no Order List</div>
  );
};

export const OrderList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [visibleOrders, setVisibleOrders] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  useEffect(() => {
    apiCall(`/api/pay/orders?buyerEmail=${sessionStorage.getItem('loginID')}`, "GET", null, null)
      .then(response => {
        const sortedOrders = response.data.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
        setOrders(sortedOrders);
      })
      .catch(err => console.log(err));
  }, []);

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

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    setVisibleOrders(nextPage * ordersPerPage);
    setCurrentPage(nextPage);
  };

  const renderPageInfo = () => {
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    return `${currentPage} / ${totalPages}`;
  };

  return (
    <div className="orderlistwhole">
      <div className="account-header">
        My Order List
      </div>

      {orders.length === 0 ? (
        <div className='orderlistno'> There is no Order List</div>
      ) : (
        <>
          {orders.slice(0, visibleOrders).map((order, index) => (
            <OrderItem key={index} order={order} onClick={popupClick} />
          ))}

          {visibleOrders < orders.length && (
            <div className='moreviewdiv'>
              <button onClick={handleShowMore} className='moreviewbtn'>
                More View ({renderPageInfo()})
              </button>
            </div>
          )}
        </>
      )}

      {showPopup && selectedOrder && (
        <div className="orderpopup-overlay">
          <div className='orderdetailscontainer'>
            <div className='orderlist1st'>
              <div className='orderdetaildate'>Order date : <br />{new Date(selectedOrder.paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>
              <div className='orderdetailpcode'>Order number : <span>{selectedOrder.merchantUid}</span></div>
            </div>
            {orderDetails.map((orderDetail, index) => (
              <div className='orderdetailproductinfo' key={index}>
                <div className='orderdetailinfo'>
                  <div className='orderdetailimg'><img src={imageSrc + orderDetail.image1} alt="product" /></div>
                  <div className='productmapvalue'>
                    <div className='orderdetailpname'>{orderDetail.productname}</div>
                    <div className='orderdetailalternative'>{orderDetail.alternative}</div>
                    <div className='orderdetailcount'>{orderDetail.detailcount} EA / {orderDetail.price}￦</div>
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
      )}

    </div>
  );
};


export default OrderList;
