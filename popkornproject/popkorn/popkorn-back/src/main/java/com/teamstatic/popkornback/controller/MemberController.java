package com.teamstatic.popkornback.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;


import com.teamstatic.popkornback.entity.Cart;
import com.teamstatic.popkornback.entity.Celeb;
import com.teamstatic.popkornback.entity.Celebcommunity;
import com.teamstatic.popkornback.entity.Likey;

import com.teamstatic.popkornback.service.CartService;
import com.teamstatic.popkornback.service.CelebCommunityService;
import com.teamstatic.popkornback.service.LikeyService;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/member")
@AllArgsConstructor
public class MemberController {

    CartService cService;
    LikeyService lService;
    CelebCommunityService ccService;

    @PostMapping("/cart/addcart")
    public void saveCart(@RequestBody Cart entity) {
        Cart existingCart = cService.findByIdAndPcode(entity.getId(), entity.getPcode());
        if (existingCart != null) {
            existingCart.setDetailcount(existingCart.getDetailcount() + entity.getDetailcount());
            cService.save(existingCart);
        } else {
            cService.save(entity);
        }
    }

    @PostMapping("/likey/saveordelete")
    public List<Likey> postMethodName(@RequestBody Celeb celeb) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = null;

        if (authentication != null) {
            Object principal = authentication.getPrincipal();

            if (principal instanceof UserDetails) {
                userId = ((UserDetails) principal).getUsername();
            } else if (principal instanceof String) {
                userId = (String) principal;
            }
        }

        
        if(lService.findByIdAndArtist(userId, celeb.getArtist()).size()>0){
            lService.deleteByIdAndArtist(userId,celeb.getArtist());
            return lService.findById(userId);
        } else {
            Likey likey = Likey.builder().artist(celeb.getArtist()).id(userId).build();
            lService.save(likey);
            return lService.findById(userId);
        }
    }

    @GetMapping("/likey/getlist")
    public List<Likey> getlist() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = null;

        if (authentication != null) {
            Object principal = authentication.getPrincipal();

            if (principal instanceof UserDetails) {
                userId = ((UserDetails) principal).getUsername();
            } else if (principal instanceof String) {
                userId = (String) principal;
            }
        }

        return lService.findById(userId);
    }

    @GetMapping("/likey/countbyartist")
    public int countbyartist(String artist) {
        return lService.countByArtist(artist);
    }

    @GetMapping("/celebcommunity/celebfeeds")
    public List<Celebcommunity> celebfeeds(String artist) {
        return ccService.findByArtist(artist);
    }
    
    @PostMapping("/celebcommunity/insert")
    public List<Celebcommunity> postMethodName(@RequestBody Celebcommunity entity) {
    
        ccService.save(entity);

        return ccService.findByArtist(entity.getArtist());
    }

}
