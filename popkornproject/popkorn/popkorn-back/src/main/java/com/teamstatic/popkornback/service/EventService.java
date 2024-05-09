package com.teamstatic.popkornback.service;

import java.util.Date;
import java.util.List;

import com.teamstatic.popkornback.domain.EventDTO;
import com.teamstatic.popkornback.entity.Event;

public interface EventService {
    List<Event> findAll();

    void deleteByecode(int ecode);

    Event save(Event event);

    default Event dtoToEntity(EventDTO edto) {
        return Event.builder()
            .ecode(edto.getEcode())
            .startdate(edto.getStartdate())
            .enddate(edto.getEnddate())
            .title(edto.getTitle())
            .type(edto.getType())
            .image1(edto.getImage1())
            .content(edto.getContent())
            .build();
    }
}
