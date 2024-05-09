package com.teamstatic.popkornback.service;

import java.util.List;

import com.siot.IamportRestClient.response.Payment;
import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.entity.Orderinfo;

public interface PaymentService {
    
    void savePaymentData(List<OrderDetail> orderDetail, Payment payment, String id, boolean rewordcheck);

    List<Orderinfo> findById(String id);

    void refundPaymentData(Orderinfo orderinfo);

}
