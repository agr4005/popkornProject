package com.teamstatic.popkornback.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="likey")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Likey {

    @Id
    private long lcode;
    private String id;
    private String artist;
    
}
