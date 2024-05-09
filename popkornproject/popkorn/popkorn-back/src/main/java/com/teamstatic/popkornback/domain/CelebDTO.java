package com.teamstatic.popkornback.domain;

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
public class CelebDTO {

   private String artist;
   private String celebimg;
   private String mainimg;
   private String notice;

   private MultipartFile celebLogoFile;
   private MultipartFile celebMainFile;
   
}
