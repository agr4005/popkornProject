package com.teamstatic.popkornback.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="attendance")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Attendance {

    @Id
    private int acode;
    private String id;
    private String status;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreationTimestamp
    private LocalDateTime regdate;
    
    public void setCreatedate(LocalDateTime regdate) {
        this.regdate = regdate;
    }
    
}
