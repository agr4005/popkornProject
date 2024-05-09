package com.teamstatic.popkornback.domain;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Id;

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
public class OrderinfoDTO {

    @Id
    private String merchantUid;
    private String impUid;
    private String buyerName;
    private String buyerEmail;
    private String buyerAddr;
    private String buyerPostcode;
    private String buyerTel;
    private BigDecimal paidAmount;
    private Date paidAt;
    private String status;
    private boolean rewordcheck;
}
