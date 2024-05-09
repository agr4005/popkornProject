package com.teamstatic.popkornback.service;

import java.time.LocalDate;
import java.util.List;

import com.teamstatic.popkornback.entity.Attendance;

public interface AttendanceService {

    void save(Attendance entity);

    List<Attendance> checkAttendanceByDate(String id, LocalDate date);

    List<Attendance> findAll();

}
