package com.teamstatic.popkornback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{
   
  List<OrderDetail> findByMerchantUid(String merchantUid);

}
