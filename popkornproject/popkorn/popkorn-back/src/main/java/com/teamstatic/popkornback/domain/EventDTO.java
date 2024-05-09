package com.teamstatic.popkornback.domain;

import java.sql.Date;

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
public class EventDTO {
    private int ecode;
    private Date startdate;
    private Date enddate;
    private String title;
    private int type;
    private String image1;
    private String content;

    private MultipartFile imageFile;
    private MultipartFile contentFile;
}
