package com.teamstatic.popkornback.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.common.JSchWrapper;
import com.teamstatic.popkornback.domain.EventDTO;
import com.teamstatic.popkornback.entity.Event;
import com.teamstatic.popkornback.service.EventService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/event")
public class EventController {
    
    EventService eService;

    @GetMapping("/eventlist")
    public List<Event> eventList() {
        return eService.findAll();
    }

    @GetMapping("/deleteByecode")
    public List<Event> deleteByecode(@RequestParam int ecode) {
        eService.deleteByecode(ecode);
        return eventList();
    }

    @PostMapping("/eventSave")
    public Boolean postEventName(EventDTO edto) {

        Event entity = eService.dtoToEntity(edto);

        JSchWrapper jsch = new JSchWrapper();

        try {
            jsch.connectSFTP();
            
            // 파일 업로드
            boolean uploadSuccess1 = jsch.uploadFile(edto.getImageFile().getInputStream(),
            edto.getImageFile().getOriginalFilename(),"/event2IMG");

            // JSchWrapper 연결 종료
            jsch.disconnectSFTP();

            jsch.connectSFTP();

            boolean uploadSuccess2 = jsch.uploadFile(edto.getContentFile().getInputStream(),
            edto.getContentFile().getOriginalFilename(),"/event2IMG");

            jsch.disconnectSFTP();

            if (edto.getImageFile() != null) {
                entity.setImage1(edto.getImageFile().getOriginalFilename());
            }
    
            // Event Content Image
            if (edto.getContentFile() != null) {
                entity.setContent(edto.getContentFile().getOriginalFilename());
            }

            eService.save(entity);

            return uploadSuccess1&&uploadSuccess2;

        }catch (Exception e){

            e.printStackTrace();
            return false;
        }finally {
            // 항상 연결 종료
            jsch.disconnectSFTP();
        }

        
    }
}
