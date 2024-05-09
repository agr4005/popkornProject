package com.teamstatic.popkornback.service.impls;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.domain.OrderinfoDTO;
import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.entity.Orderinfo;
import com.teamstatic.popkornback.repository.OrderInfoRepository;
import com.teamstatic.popkornback.service.OrderInfoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderInfoServiceImple implements OrderInfoService {

    private final OrderInfoRepository oiRepository;

    public List<Orderinfo> findByMerchantUid(String merchantUid) {
        return oiRepository.findByMerchantUid(merchantUid);
    }

    @Override
    public List<Orderinfo> findByEmail(String email) {
        return oiRepository.findByBuyerEmail(email);
    }

    @Override
    public int countPaid(String buyerEmail, String status) {
        return oiRepository.countByBuyerEmailAndStatus(buyerEmail, status);
    }

    public List<Orderinfo> findByImpUid(String impUid) {
        return oiRepository.findByImpUid(impUid);
    };

    @Override
    public List<Orderinfo> getOrderInfo() {
        return oiRepository.findAll();
    }

    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByMerchantUid(String merchantUid, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());
        Page<Orderinfo> result = oiRepository.findAllByMerchantUid(merchantUid, pageable);
        return new PageResultDTO<>(result, this::entityToDto);
    }
    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByRefundMerchantUid(String merchantUid, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());
        Page<Orderinfo> result = oiRepository.findAllByRefundMerchantUid(merchantUid, pageable);
        return new PageResultDTO<>(result, this::entityToDto);
    }
    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByDeliveriedMerchantUid(String merchantUid, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());
        Page<Orderinfo> result = oiRepository.findAllByDeliveriedMerchantUid(merchantUid, pageable);
        return new PageResultDTO<>(result, this::entityToDto);
    }

    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByBuyerEmail(String email, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());
        Page<Orderinfo> result = oiRepository.findAllByBuyerEmail(email, pageable);
        
        return new PageResultDTO<>(result, this::entityToDto);
    }
    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByRefundBuyerEmail(String email, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());
        Page<Orderinfo> result = oiRepository.findAllByRefundBuyerEmail(email, pageable);
        
        return new PageResultDTO<>(result, this::entityToDto);
    }
    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByDeliveriedBuyerEmail(String email, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());
        Page<Orderinfo> result = oiRepository.findAllByDeliveriedBuyerEmail(email, pageable);
        
        return new PageResultDTO<>(result, this::entityToDto);
    }

    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByBuyerTel(String tel, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());
        Page<Orderinfo> result = oiRepository.findAllByBuyerTel(tel, pageable);
        return new PageResultDTO<>(result, this::entityToDto);
    }

    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByRefundBuyerTel(String tel, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());
        Page<Orderinfo> result = oiRepository.findAllByRefundBuyerTel(tel, pageable);
        return new PageResultDTO<>(result, this::entityToDto);
    }

    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllByDeliveriedBuyerTel(String tel, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());
        Page<Orderinfo> result = oiRepository.findAllByDeliveriedBuyerTel(tel, pageable);
        return new PageResultDTO<>(result, this::entityToDto);
    }

    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAll(PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());

        Page<Orderinfo> result = oiRepository.findAllByKeywordLike(requestDTO.getKeyword(), pageable);

        return new PageResultDTO<>(result, this::entityToDto);
    }

    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllRefund(PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());

        Page<Orderinfo> result = oiRepository.findAllByRefundKeywordLike(requestDTO.getKeyword(), pageable);

        return new PageResultDTO<>(result, this::entityToDto);
    }

    @Override
    public PageResultDTO<OrderinfoDTO, Orderinfo> findAllDeliveried(PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("paid_At").descending());

        Page<Orderinfo> result = oiRepository.findAllByDeliveriedKeywordLike(requestDTO.getKeyword(), pageable);

        return new PageResultDTO<>(result, this::entityToDto);
    }

    @Override
    public long countAll() {
        return oiRepository.count();
    }

    @Override
    public Orderinfo save(Orderinfo Orderinfo) {
        return oiRepository.save(Orderinfo);
    }

    @Override
    public List<Orderinfo> findAll() {
        return oiRepository.findAll();
    }

}
