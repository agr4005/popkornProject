package com.teamstatic.popkornback.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.teamstatic.popkornback.domain.OrderinfoDTO;
import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.entity.Orderinfo;

public interface OrderInfoService {

    List<Orderinfo> findByMerchantUid(String merchantUid);
    
    public List<Orderinfo> findByEmail(String email);

    int countPaid(String buyerEmail, String status);

    List<Orderinfo> findByImpUid(String impUid);

    Orderinfo save(Orderinfo entity);

    public List<Orderinfo> getOrderInfo();

    default OrderinfoDTO entityToDto(Orderinfo entity) {
        return OrderinfoDTO.builder()
                .merchantUid(entity.getMerchantUid())
                .impUid(entity.getImpUid())
                .buyerName(entity.getBuyerName())
                .buyerEmail(entity.getBuyerEmail())
                .buyerAddr(entity.getBuyerAddr())
                .buyerPostcode(entity.getBuyerPostcode())
                .buyerTel(entity.getBuyerTel())
                .paidAmount(entity.getPaidAmount())
                .paidAt(entity.getPaidAt())
                .status(entity.getStatus())
                .build();
    }

    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByMerchantUid(String merchantUid, PageRequestDTO requestDTO);
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByRefundMerchantUid(String merchantUid, PageRequestDTO requestDTO);
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByDeliveriedMerchantUid(String merchantUid, PageRequestDTO requestDTO);

    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByBuyerEmail(String email, PageRequestDTO requestDTO);
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByRefundBuyerEmail(String email, PageRequestDTO requestDTO);
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByDeliveriedBuyerEmail(String email, PageRequestDTO requestDTO);

    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByBuyerTel(String tel, PageRequestDTO requestDTO);
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByRefundBuyerTel(String tel, PageRequestDTO requestDTO);
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByDeliveriedBuyerTel(String tel, PageRequestDTO requestDTO);

    public long countAll();

    public PageResultDTO<OrderinfoDTO, Orderinfo> findAll(PageRequestDTO requestDTO);

    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllRefund(PageRequestDTO requestDTO);

    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllDeliveried(PageRequestDTO requestDTO);
    
    public List<Orderinfo> findAll();

}
