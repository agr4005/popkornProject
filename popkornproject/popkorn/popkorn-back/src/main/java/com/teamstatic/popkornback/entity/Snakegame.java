package com.teamstatic.popkornback.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "snakegame")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Snakegame {
    
    @Id
    private String nickname;
    private int record;

}
