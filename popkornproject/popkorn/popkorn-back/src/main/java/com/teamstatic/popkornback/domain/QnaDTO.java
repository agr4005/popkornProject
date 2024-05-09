package com.teamstatic.popkornback.domain;

import java.util.Date;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class QnaDTO {
  
  @Id
  private int sno;
  private Integer root;
  private String category;
  private String title;
  private String content;
  private String id;
  private Date postcreated;
  private Date commentcreated;
  
}
