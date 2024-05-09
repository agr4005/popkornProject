package com.teamstatic.popkornback.service;

import java.util.List;

import com.teamstatic.popkornback.entity.OrderDetail;

public interface OrderDetailService {
   
    List<OrderDetail> save(List<OrderDetail> orderDetail);

    List<OrderDetail> findByMerchantUid(String merchantUid);

}
