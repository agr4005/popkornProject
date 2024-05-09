package com.teamstatic.popkornback.domain;

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
public class CartDTO {

    private int ccode;
    private String id;
    private int pcode;
    private int detailcount;
    private String alternative;
    private int price;
    private String image1;
    private String productname;
    
}
