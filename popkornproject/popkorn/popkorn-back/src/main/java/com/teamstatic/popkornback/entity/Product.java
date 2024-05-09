package com.teamstatic.popkornback.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Product {

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

    public void setCreatedate(LocalDateTime receiptdate) {
        this.receiptdate = receiptdate;
    }

    private String image1;
    private String image2;
    private String image3;

}
