package com.teamstatic.popkornback.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.entity.Orderinfo;

public interface OrderInfoRepository extends JpaRepository<Orderinfo, String> {

    List<Orderinfo> findByMerchantUid(String merchantUid);

    List<Orderinfo> findByBuyerEmail(String email);

    int countByBuyerEmailAndStatus(String buyerEmail, String status);

    List<Orderinfo> findByImpUid(String impUid);

    @Query(value = "SELECT * FROM orderinfo WHERE merchant_uid LIKE CONCAT('%', :merchantUid, '%') AND (status != 'Refund' AND status != 'refund request' And status != 'Confirmed')", nativeQuery = true)
    Page<Orderinfo> findAllByMerchantUid(String merchantUid, Pageable pageable);
    
    @Query(value = "SELECT * FROM orderinfo WHERE merchant_uid LIKE CONCAT('%', :merchantUid, '%') AND status = 'refund request'", nativeQuery = true)
    Page<Orderinfo> findAllByRefundMerchantUid(String merchantUid, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo WHERE merchant_uid LIKE CONCAT('%', :merchantUid, '%') AND (status = 'Deliveried' OR status = 'Confirmed')", nativeQuery = true)
    Page<Orderinfo> findAllByDeliveriedMerchantUid(String merchantUid, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo WHERE buyer_Email LIKE CONCAT('%', :email, '%') AND (status != 'Refund' AND status != 'refund request' And status != 'Confirmed')", nativeQuery = true)
    Page<Orderinfo> findAllByBuyerEmail(String email, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo WHERE buyer_Email LIKE CONCAT('%', :email, '%') AND status = 'refund request'", nativeQuery = true)
    Page<Orderinfo> findAllByRefundBuyerEmail(String email, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo WHERE buyer_Email LIKE CONCAT('%', :email, '%') AND (status = 'Refund' OR status = 'Confirmed')", nativeQuery = true)
    Page<Orderinfo> findAllByDeliveriedBuyerEmail(String email, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo WHERE buyer_Tel LIKE CONCAT('%', :tel, '%') AND (status != 'Refund' AND status != 'refund request' And status != 'Confirmed')", nativeQuery = true)
    Page<Orderinfo> findAllByBuyerTel(String tel, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo WHERE buyer_Tel LIKE CONCAT('%', :tel, '%') AND status = 'refund request'", nativeQuery = true)
    Page<Orderinfo> findAllByRefundBuyerTel(String tel, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo WHERE buyer_Tel LIKE CONCAT('%', :tel, '%') AND (status = 'Refund' OR status = 'Confirmed')", nativeQuery = true)
    Page<Orderinfo> findAllByDeliveriedBuyerTel(String tel, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo o WHERE " +
            "(o.merchant_uid LIKE CONCAT('%', :keyword, '%') OR " +
            "o.buyer_email LIKE CONCAT('%', :keyword, '%') OR " +
            "o.buyer_tel LIKE CONCAT('%', :keyword, '%')) " +
            "AND (o.status != 'Refund' AND o.status != 'refund request' AND o.status != 'Confirmed')", nativeQuery = true)
    Page<Orderinfo> findAllByKeywordLike(String keyword, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo o WHERE " +
            "(o.merchant_uid LIKE CONCAT('%', :keyword, '%') OR " +
            "o.buyer_email LIKE CONCAT('%', :keyword, '%') OR " +
            "o.buyer_tel LIKE CONCAT('%', :keyword, '%')) " +
            "AND o.status = 'refund request'", nativeQuery = true)
    Page<Orderinfo> findAllByRefundKeywordLike(String keyword, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo o WHERE " +
            "(o.merchant_uid LIKE CONCAT('%', :keyword, '%') OR " +
            "o.buyer_email LIKE CONCAT('%', :keyword, '%') OR " +
            "o.buyer_tel LIKE CONCAT('%', :keyword, '%')) " +
            "AND (o.status = 'Refund' OR o.status = 'Confirmed')", nativeQuery = true)
    Page<Orderinfo> findAllByDeliveriedKeywordLike(String keyword, Pageable pageable);

}
