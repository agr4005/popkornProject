package com.teamstatic.popkornback.domain;

import javax.persistence.Id;

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
public class SnakegameDTO {
    
    @Id
    private String nickname;
    private int record;

}
