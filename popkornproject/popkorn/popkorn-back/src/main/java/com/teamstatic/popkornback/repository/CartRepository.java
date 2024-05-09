package com.teamstatic.popkornback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Cart;
import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    List<Cart> findById(String id);

    Cart findByIdAndPcode(String id, int pcode);

    int deleteByIdAndPcode(String id, int pcode);

}
