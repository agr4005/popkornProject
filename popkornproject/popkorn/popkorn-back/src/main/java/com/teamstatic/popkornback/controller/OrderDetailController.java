package com.teamstatic.popkornback.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.service.OrderDetailService;
import com.teamstatic.popkornback.service.UserService;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@AllArgsConstructor
@RequestMapping("/api/orderdetail")
public class OrderDetailController {

    OrderDetailService odService;
    UserService uservice;
    PasswordEncoder passwordEncoder;

    @PostMapping("/saveOrderDetail")
    public List<OrderDetail> saveOrderDetail(@RequestBody List<OrderDetail> orderDetail) {

        List<OrderDetail> list;

        if (!orderDetail.isEmpty() && orderDetail.size() > 0) {
            list = odService.save(orderDetail);
            return list;
        } else {
            return null;
        }
    }

    @GetMapping("/orderlist")
    public List<OrderDetail> findByMerchantUid(@RequestParam String merchantUid) {
        
        return odService.findByMerchantUid(merchantUid);
    }

    @GetMapping("/emailcheck")
    public Boolean emailcheck(@RequestParam String emailinput) {
        User user = uservice.findByUserId(emailinput);
        return (user != null);
    }

    @PostMapping("/makeorderkey")
public String makeorderkey(@RequestBody Map<String, String> requestBody) {
    String id = requestBody.get("id");
    String password = requestBody.get("password");

    User user = new User();
    String encodedPassword = passwordEncoder.encode(password);

    user.setId(id);
    user.setPassword(encodedPassword);
    user.setNickname(password);
    user.setStatus("unsigned");
    try {
        uservice.save(user);
        return "주문키 생성 성공";
    } catch (Exception e) {
        return "주문키 생성 실패";
    }
}

@PostMapping("/inquiry")
    public String login(@RequestBody Map<String, String> requestBody) {
        String emailinput = requestBody.get("emailinput");
        String pwinput = requestBody.get("pwinput");

        User user = uservice.findByUserId(emailinput);

        if (user != null) {
            String password = user.getPassword();
            if (passwordEncoder.matches(pwinput, password)) {
                return user.getId();
            } else {
                return "Login failed";
            }
        } else {
            return "Login failed";
        }
    }

}
