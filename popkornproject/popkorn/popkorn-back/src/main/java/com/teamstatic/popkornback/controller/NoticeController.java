package com.teamstatic.popkornback.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.domain.NoticeDTO;
import com.teamstatic.popkornback.entity.Notices;
import com.teamstatic.popkornback.service.NoticeService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/notices")
public class NoticeController {
    NoticeService nService;
   
    @PostMapping("/insert")
    public List<Notices> insertNotices(@RequestBody NoticeDTO noticeDTO) {
        // NoticeDTO noticeDTO = NoticeDTO.builder()
        //         .id(id)
        //         .content(content)
        //         .build();

        Notices notice = new Notices();
        notice.setId(noticeDTO.getId());
        notice.setContent(noticeDTO.getContent());

        nService.save(notice);
        return getNotices();
    }

    @GetMapping("/getnotices")
    public List<Notices> getNotices() {
        return nService.findAll();
    }
}
