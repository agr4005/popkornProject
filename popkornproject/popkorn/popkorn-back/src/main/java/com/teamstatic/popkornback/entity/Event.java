package com.teamstatic.popkornback.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "event")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Event {
    @Id
    private int ecode;
    private Date startdate;
    private Date enddate;
    private String title;
    private int type;
    private String image1;
    private String content;
}
