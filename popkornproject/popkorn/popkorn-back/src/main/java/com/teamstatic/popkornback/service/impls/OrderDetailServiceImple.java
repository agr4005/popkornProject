package com.teamstatic.popkornback.service.impls;

import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.repository.OrderDetailRepository;
import com.teamstatic.popkornback.service.OrderDetailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderDetailServiceImple implements OrderDetailService {

    final OrderDetailRepository odRepository;

    public List<OrderDetail> save(List<OrderDetail> orderDetail) {
        return odRepository.saveAll(orderDetail);
    }

    @Override
    public List<OrderDetail> findByMerchantUid(String merchantUid) {
        return odRepository.findByMerchantUid(merchantUid);
    }

    
}
