package com.teamstatic.popkornback.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="celeb")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Celeb {
   
   @Id
   private String artist;
   private String celebimg;
   private String mainimg;
   private String notice;
   
}
