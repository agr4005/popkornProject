package com.teamstatic.popkornback.service;

import java.util.List;

import com.teamstatic.popkornback.domain.NoticeDTO;
import com.teamstatic.popkornback.entity.Notices;

public interface NoticeService {

    Notices save(Notices notice);

    List<Notices> findAll();

    default Notices dtoToEntity(NoticeDTO ndto) {
        return Notices.builder()
                .ncode(ndto.getNcode())
                .id(ndto.getId())
                .content(ndto.getContent())
                .regdate(ndto.getRegdate())
                .build();
    }

    default NoticeDTO entityToDto(Notices entity) {
        return NoticeDTO.builder()
                .ncode(entity.getNcode())
                .id(entity.getId())
                .content(entity.getContent())
                .regdate(entity.getRegdate())
                .build();
    }
}
