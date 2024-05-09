package com.teamstatic.popkornback.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Event;

public interface EventRepository extends JpaRepository<Event, Integer>{

    void deleteAllByEnddate(LocalDate enddate);

    void deleteByecode(int ecode);



}
