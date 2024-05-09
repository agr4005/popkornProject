package com.teamstatic.popkornback.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "notices")
public class Notices {
    
    @Id
    private int ncode;
    private String id; // User 테이블 외래키 
    private String content;
    @CreationTimestamp
    private LocalDateTime regdate;
    public void setCreatedate(LocalDateTime regdate) {
        this.regdate = regdate;
    }
}
