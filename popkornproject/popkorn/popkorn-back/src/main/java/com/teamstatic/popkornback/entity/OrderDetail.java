package com.teamstatic.popkornback.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="orderdetail")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class OrderDetail {
   
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int Aodcode;
   private String merchantUid;   
   private int pcode;            
   private String productname;
   private int price;  
   private int detailcount;           
   private String alternative;  
   private String image1;        

}
