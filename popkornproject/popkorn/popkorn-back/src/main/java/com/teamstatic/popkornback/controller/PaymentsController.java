package com.teamstatic.popkornback.controller;

import java.io.IOException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.entity.Orderinfo;

import com.teamstatic.popkornback.service.CartService;
import com.teamstatic.popkornback.service.OrderDetailService;
import com.teamstatic.popkornback.service.OrderInfoService;
import com.teamstatic.popkornback.service.PaymentService;
import com.teamstatic.popkornback.service.ProductService;
import com.teamstatic.popkornback.service.UserService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;

@Slf4j
@RequestMapping("/api/pay")
@RestController
public class PaymentsController {

   IamportClient iamportClient;

   @Autowired
   PaymentService payService;
   @Autowired
   OrderDetailService odService;
   @Autowired
   ProductService pService;
   @Autowired
   CartService cService;
   @Autowired
   UserService uService;
   @Autowired
   OrderInfoService oService;

   private PaymentsController() {
      this.iamportClient = new IamportClient("3803508415015286",
            "hflvwap97oFoYSjRe3uTfEgy0CLNw0bXMfV7Og1UAUjgpS29O3buAQ3Lgw7ntgNNOjNfmIcDteoBNAzl");
   }

   @PostMapping("/datatoserver")
   public boolean datatoserver(@RequestBody Map<String, Object> request)
         throws IamportResponseException, IOException {

      String imp_uid = (String) request.get("imp_uid");
      String id = (String) request.get("id");
      boolean rewordcheck = (boolean) request.get("rewordcheck");
      List<Map<String, Object>> items = (List<Map<String, Object>>) request.get("items");
      List<OrderDetail> orderDetail = new ArrayList<>();
      IamportResponse<Payment> paymentIamportResponse = iamportClient.paymentByImpUid(imp_uid);
      Payment payment = paymentIamportResponse.getResponse();

      for (Map<String, Object> item : items) {
         OrderDetail detail = new OrderDetail();
         detail.setMerchantUid((String) item.get("merchantUid"));
         detail.setPcode((int) item.get("pcode"));
         detail.setProductname((String) item.get("productname"));
         detail.setPrice((int) item.get("price"));
         detail.setDetailcount((int) item.get("detailcount"));
         detail.setAlternative((String) item.get("alternative"));
         detail.setImage1((String) item.get("image1"));
         orderDetail.add(detail);
      }

      // 재고가 주문량보다 적을 경우 주문 취소
      for (OrderDetail product : orderDetail) {
         if (product.getDetailcount() > pService.findByPcode(product.getPcode()).getStock()) {
            iamportClient.cancelPaymentByImpUid(new CancelData(imp_uid, true));
            return false;
         }
      }

      try {

         payService.savePaymentData(orderDetail, payment, id, rewordcheck);
         // 결과 주문내역 return (merchant_uid, email, ETC)
         return true;

      } catch (Exception e) {
         // 상기 try 부분에서 무결성에 문제가 생길경우 결제 취소.
         log.info("결제 오류 발생!!! 결제를 취소합니다. err =>" + e);
         iamportClient.cancelPaymentByImpUid(new CancelData(imp_uid, true));
         return false;
      }

   }

   @GetMapping("/orders")
   public List<Orderinfo> getOrdersById(@RequestParam String buyerEmail) {
      return payService.findById(buyerEmail);
   }

   
   public boolean refund(@RequestBody Orderinfo orderinfo) throws IamportResponseException, IOException {

      System.out.println(orderinfo);
      

      if (oService.findByImpUid(orderinfo.getImpUid()).size() > 0) {
         iamportClient.cancelPaymentByImpUid(new CancelData(orderinfo.getImpUid(), true));
         orderinfo.setStatus("Refund");

         try {

            payService.refundPaymentData(orderinfo);

            oService.save(orderinfo);

            return true;
   
         } catch (Exception e) {
            // 상기 try 부분에서 무결성에 문제가 생길경우 결제 취소.
            log.info("환불 오류 발생!!! 환불을 취소합니다. err =>");
            e.printStackTrace();
            return false;
         }
      } else {
         return false;
      }
   }

}
