package com.teamstatic.popkornback.service.impls;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.Payment;
import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.entity.Orderinfo;
import com.teamstatic.popkornback.entity.Product;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.repository.CartRepository;
import com.teamstatic.popkornback.repository.OrderDetailRepository;
import com.teamstatic.popkornback.repository.PaymentRepository;
import com.teamstatic.popkornback.repository.ProductRepsitory;
import com.teamstatic.popkornback.repository.UserRepository;
import com.teamstatic.popkornback.service.PaymentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImple implements PaymentService {

    private final PaymentRepository payRepository;
    private final ProductRepsitory pRepsitory;
    private final CartRepository cRepository;
    private final UserRepository uRepository;
    private final OrderDetailRepository odRepository;

    @Transactional(rollbackFor = { Exception.class })
    public void savePaymentData(List<OrderDetail> orderDetail, Payment payment, String id, boolean rewordcheck) {

        // 결제 요청에 문제가 없어 Payment 테이블에 주문 내역 정보 저장.
        Orderinfo orderinfoEntity = Orderinfo.builder()
                .merchantUid(payment.getMerchantUid())
                .impUid(payment.getImpUid())
                .buyerName(payment.getBuyerName())
                .buyerEmail(payment.getBuyerEmail())
                .buyerAddr(payment.getBuyerAddr())
                .buyerPostcode(payment.getBuyerPostcode())
                .buyerTel(payment.getBuyerTel())
                .paidAmount(payment.getAmount())
                .paidAt(payment.getPaidAt())
                .status("Paid")
                .rewordcheck(rewordcheck)
                .build();
        payRepository.save(orderinfoEntity);

        // 1.Product table => pcode에 해당하는 상품 stock, releasing 필드값 반영.
        for (OrderDetail orderDetail2 : orderDetail) {
            Product product = pRepsitory.findByPcode(orderDetail2.getPcode());
            product.setStock(product.getStock() - orderDetail2.getDetailcount());
            product.setReleasing(product.getReleasing() + orderDetail2.getDetailcount());
            pRepsitory.save(product);
        }

        // 2.Cart table => 해당하는 id와 pcode의 cart 물품 삭제.
        // => 총 금액 계산
        int totalprice = 0;
        if (id != null) {
            for (OrderDetail orderDetail2 : orderDetail) {
                cRepository.deleteByIdAndPcode(id, orderDetail2.getPcode());
                totalprice += orderDetail2.getPrice();
            }
        }

        // 3. User table => 해당하는 id 의 reword 값 반영
        // => 비회원인 경우 실행 안함.
        if (id != null && !rewordcheck) {
            User user = uRepository.findById(id).get();
            user.setReword(user.getReword() + (int) (payment.getAmount().intValue() * 0.1));
            uRepository.save(user);
        } else if (id != null && rewordcheck) {
            for (OrderDetail orderDetail2 : orderDetail) {
                cRepository.deleteByIdAndPcode(id, orderDetail2.getPcode());
            }
            User user = uRepository.findById(id).get();
            user.setReword(user.getReword() + payment.getAmount().intValue() - totalprice);
            uRepository.save(user);
        }

        // 4. 해당 주문번호와 그 값들 OrderDetail 처리
        odRepository.saveAll(orderDetail);
    }

    @Override
    public List<Orderinfo> findById(String id) {
        return payRepository.findBybuyerEmail(id);
    }

    @Transactional
    public void refundPaymentData(Orderinfo orderinfo) {

        List<OrderDetail> orderDetails = odRepository.findByMerchantUid(orderinfo.getMerchantUid());

        for (OrderDetail orderDetail : orderDetails) {
            // 재고,출고 원상 복귀, 추가
            Product entity = pRepsitory.findByPcode(orderDetail.getPcode());
            entity.setStock(entity.getStock() + orderDetail.getDetailcount());
            entity.setReleasing(entity.getReleasing() - orderDetail.getDetailcount());
            pRepsitory.save(entity);
        }

        User user = uRepository.findByUserId(orderinfo.getBuyerEmail());
        if (user != null) {
            // 유저 리워드 (-) 하기
            user.setReword(user.getReword()-(int)(orderinfo.getPaidAmount().intValue()*0.1));
            uRepository.save(user);
        }
    }

}
