package com.teamstatic.popkornback.domain;

import java.time.LocalDateTime;

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
public class NoticeDTO {
    private int ncode;
    private String id; // 사용자
    private String content;
    @CreationTimestamp
    private LocalDateTime regdate;
}
