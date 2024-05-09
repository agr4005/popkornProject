package com.teamstatic.popkornback.domain;


import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

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
public class UserDTO {

    private String id;
	private String token;
    private String password;
    private String nickname;
    private int reword;
    @CreationTimestamp
    private String createdate;
    private String status;
    private List<UserRole> roleList = new ArrayList<>();
}
