package com.teamstatic.popkornback.service;

import java.util.List;

import com.teamstatic.popkornback.entity.Cart;

public interface CartService {

    List<Cart> findById(String id);

    Cart findByIdAndPcode(String id, int pcode);

    Cart save(Cart entity);

    int deleteByIdAndPcode(String id, int pcode);

}
