package com.teamstatic.popkornback.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.Cart;
import com.teamstatic.popkornback.repository.CartRepository;
import com.teamstatic.popkornback.service.CartService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/cart")
public class CartController {

    CartService cService;
    CartRepository cRepository;

    @GetMapping("/selectlist")
    public List<Cart> selectlist(String id) {
        return cService.findById(id);
    }

    public Cart selectOne(String id, int pcode) {
        return cService.findByIdAndPcode(id, pcode);
    }

    @DeleteMapping("/delete")
    public void deletecart(String id, int pcode) {
        cService.deleteByIdAndPcode(id, pcode);
    }
    
}
