package com.teamstatic.popkornback.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer>{
    
    @Query(value = "SELECT * FROM attendance WHERE id = :id AND DATE(regdate) = :date", nativeQuery = true)
    List<Attendance> findByUserIdAndRegdate(String id, LocalDate date);

}
