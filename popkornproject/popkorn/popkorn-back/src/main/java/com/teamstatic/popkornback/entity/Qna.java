package com.teamstatic.popkornback.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "qna")
public class Qna {

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
