package com.teamstatic.popkornback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Orderinfo;

public interface PaymentRepository extends JpaRepository<Orderinfo, String>{

  List<Orderinfo> findBybuyerEmail(String id);
}
