import { useEffect, useState } from "react";
import { apiCall } from "../../service/apiService";



export const Mypagebasic = () => {

  const [responseData, setResponseData] = useState('');

  useEffect(() => {
    const handleDelivery = async () => {
      const buyerEmail = sessionStorage.getItem("loginID");
      const status = "paid";

      try {
        const response = await apiCall(`/api/orderinfo/countByStatus?buyerEmail=${buyerEmail}&status=${status}`, "GET", null, null);
        if (response.data) {
          setResponseData(response.data);
          return responseData;
        } else {
          throw new Error('Failed to fetch delivery status');
        }
      } catch (error) {
        console.error('Error occurred while fetching delivery status:', error);
      }
    };
    handleDelivery();
  }, []);

  return (
    <div className="mypagebasicwhole">
      <div className="basicsituation">
        <div className="situationsmallheader">
          My Order Processing Status
        </div>
        <div className="situationstatus">
          <div className="situationstatusdeliver1">Paid
            <div className="deliveryvalue">{responseData[0]}
            </div>
          </div>
          <div className="situationstatusdeliver2">Ready for ship
            <div className="deliveryvalue">{responseData[1]}
            </div>
          </div>
          <div className="situationstatusdeliver3">Shipping
            <div className="deliveryvalue">{responseData[2]}
            </div>
          </div>
          <div className="situationstatusdeliver4">Delivered
            <div className="deliveryvalue">{responseData[3]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypagebasic;