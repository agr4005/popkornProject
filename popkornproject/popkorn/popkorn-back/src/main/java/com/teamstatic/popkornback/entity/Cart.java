package com.teamstatic.popkornback.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="cart")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Cart {
    
    @Id
    private int ccode;
    private String id;
    private int pcode;
    private int detailcount;
    private String alternative;
    private int price;
    private String image1;
    private String productname;

}
