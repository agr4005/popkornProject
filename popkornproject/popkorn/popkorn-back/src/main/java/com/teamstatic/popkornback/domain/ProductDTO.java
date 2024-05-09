package com.teamstatic.popkornback.domain;
import java.time.LocalDateTime;

import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Data
public class ProductDTO {
    
    @Id
    private int pcode;
    private String productname;
    private String artist;
    private String categoryl;
    private String categorym;
    private String categorys;
    private int price;
    private String alternative;
    private int stock;
    private int releasing;
    private int storing;
    @CreationTimestamp
    private LocalDateTime receiptdate;
    private String image1;
    private String image2;
    private String image3;

    private MultipartFile imageFile; 

}
