package com.teamstatic.popkornback.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.domain.OrderinfoDTO;
import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.entity.Orderinfo;
import com.teamstatic.popkornback.service.OrderInfoService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequestMapping("/api/orderinfo")
@RestController
@AllArgsConstructor
public class OrderIndoController {

    OrderInfoService oiService;

    @GetMapping("/findByMerchantUid")
    public List<Orderinfo> findByMerchantUid(@RequestParam String merchantUid) {
        List<Orderinfo> response = oiService.findByMerchantUid(merchantUid);
        return response;
    }

    @GetMapping("/findByEmail")
    public List<Orderinfo> findByEmail(@RequestParam String email) {
        List<Orderinfo> response = oiService.findByEmail(email);
        return response;
    }

    @GetMapping("/countByStatus")
    public List<Integer> countOrdersByStatus(@RequestParam String buyerEmail) {
        List<Integer> count = new ArrayList<>();
        count.add(oiService.countPaid(buyerEmail, "paid"));
        count.add(oiService.countPaid(buyerEmail, "Ready for ship"));
        count.add(oiService.countPaid(buyerEmail, "Shipping"));
        count.add(oiService.countPaid(buyerEmail, "Deliveried"));
        return count;
    }

    @GetMapping("/orderinfoinquiry")
    public List<Orderinfo> getOrderInfo() {
        return oiService.getOrderInfo();
    }

    @PostMapping("/refundrequest")
    public boolean postMethodName(@RequestBody Orderinfo entity) {

        entity.setStatus("refund request");
        if (oiService.findByImpUid(entity.getImpUid()).size() > 0) {
            oiService.save(entity);
            return true;
        } else {
            return false;
        }

    }

    @GetMapping("/searchlist")
    public PageResultDTO<OrderinfoDTO, Orderinfo> searchlist(String searchType, String keyword, int page) {
        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(page)
                .size(5)
                .keyword(keyword)
                .build();

        switch (searchType) {
            case "merchantUid":
                return oiService.findAllByMerchantUid(keyword, requestDTO);
            case "buyerEmail":
                return oiService.findAllByBuyerEmail(keyword, requestDTO);
            case "buyerTel":
                return oiService.findAllByBuyerTel(keyword, requestDTO);
            default:
                return oiService.findAll(requestDTO);
        }
    }

    @GetMapping("/searchRefundlist")
    public PageResultDTO<OrderinfoDTO, Orderinfo> searchRefundlist(String searchType, String keyword, int page) {
        System.out.println("Search Type: " + searchType + ", Keyword: " + keyword + ", Page: " + page);
        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(page)
                .size(5)
                .keyword(keyword)
                .build();

        switch (searchType) {
            case "merchantUid":
                return oiService.findAllByRefundMerchantUid(keyword, requestDTO);
            case "buyerEmail":
                return oiService.findAllByRefundBuyerEmail(keyword, requestDTO);
            case "buyerTel":
                return oiService.findAllByRefundBuyerTel(keyword, requestDTO);
            default:
                return oiService.findAllRefund(requestDTO);
        }
    }

    @GetMapping("/searchLegacy")
    public PageResultDTO<OrderinfoDTO, Orderinfo> searchLegacy(String searchType, String keyword, int page) {
        System.out.println("Search Type: " + searchType + ", Keyword: " + keyword + ", Page: " + page);
        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(page)
                .size(5)
                .keyword(keyword)
                .build();

        switch (searchType) {
            case "merchantUid":
                return oiService.findAllByDeliveriedMerchantUid(keyword, requestDTO);
            case "buyerEmail":
                return oiService.findAllByDeliveriedBuyerEmail(keyword, requestDTO);
            case "buyerTel":
                return oiService.findAllByDeliveriedBuyerTel(keyword, requestDTO);
            default:
                return oiService.findAllDeliveried(requestDTO);
        }
    }

    @PostMapping("/updatestatus")
    public String updateStatus(@RequestParam("merchantuid") String merchantuid, @RequestParam("status") String status) {
        try {
            List<Orderinfo> focusorderInfo = oiService.findByMerchantUid(merchantuid);

            Orderinfo orderInfo = focusorderInfo.get(0);
            orderInfo.setStatus(status);
            oiService.save(orderInfo);
            return status;
        } catch (Exception e) {
            return "주문 상태 변경 실패: " + e.getMessage();
        }
    }

}
