import { useState, useEffect } from 'react';
import { apiCall } from '../service/apiService';
import './inquiryorderlist.css';
import { Link } from 'react-router-dom';


const imageSrc = process.env.PUBLIC_URL + "/productIMG/";

const OrderItem = ({ order, onClick }) => {
  console.log(order)

  return (
    <div className='inquiryordercontainer'>
      <div className='inquiryorder1st'>
        <div className='inquirydate'>Order date : {new Date(order.paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>
        <div className='inquirydetailcheck' onClick={() => onClick(order)}>Order detail</div>
      </div>
      <div className='inquiryorder2nd'>
        <div className='inquirydetailnumber'>Order Number : <span className="inquiryorderspan">{order.merchantUid}</span></div><br />
        Buyer name: {order.buyerName} <br />
        Address: {order.buyerAddr} <br />
        Phone: {order.buyerTel} <br />
        status: {order.status} <br />
      </div>
      <div className='inquiryorderbtn'>{
        order.status === "refund request"?
        <></>
        :
        <Link to="/refund" state={{ id: order.merchantUid }}>
          <button className='inquiryrefundbtn'>Refund</button>
        </Link>
        }
        <button className='inquiryinquirement'>Inquirement</button>
        <div className='inquirytotalprice'>
          Total amount : {order.paidAmount} ₩
        </div>
      </div>
    </div>
  );
};


export const OrderList = ({ ordernum }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiCall(`/api/orderinfo/findByMerchantUid?merchantUid=${ordernum}`, "GET", null, null);
        console.log(ordernum)
        if (response && response.data) {
          setOrders(response.data);
          console.log(response)
        } else {
          console.error('API response does not contain order data:', response);

        }
      } catch (error) {
        console.error('Error while fetching orders:', error);
      }
    };

    fetchOrder();
  }, [ordernum]);

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

  return (
    <div className="inquirywhole">

      {orders.map((order, index) => (
        <OrderItem key={index} order={order} onClick={popupClick} />
      ))}
      {showPopup && selectedOrder && (
        <div className="inquirypopup-overlay">
          <div className='orderdetailscontainer'>
            <div className='inquiryorder1st'>
              <div className='inquirydate'>Order date : {new Date(selectedOrder.paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>
              <div className='inquirynumber'>Order number : <span className="inquiryorderspan">{selectedOrder.merchantUid}</span></div>
            </div>
            {orderDetails.map((orderDetail, index) => (
              <div className='inquiryproductinfo' key={index}>
                <div className='inquiryorderdetailinfo'>
                  <div className='inquiryorderimg'><img src={imageSrc + orderDetail.image1} alt="product" /></div>
                  <div className='inquirymapvalue'>
                    <div className='inquirypname'>{orderDetail.productname}</div>
                    <div className='inquiryalternative'>{orderDetail.alternative}</div>
                    <div className='inquirycount'>{orderDetail.detailcount} EA / {orderDetail.price}￦</div>
                  </div>
                </div>
              </div>
            ))}
            <div className='inquiryorder3rd'>
              <div className='inquirytotalprice'>
                Total amount : {orderDetails.reduce((total, orderDetail) => total + (orderDetail.price * orderDetail.detailcount), 0)} ₩
              </div>
            </div>
            <button className="inquirypopup-close-btn" onClick={closePopup}>X</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderList;
