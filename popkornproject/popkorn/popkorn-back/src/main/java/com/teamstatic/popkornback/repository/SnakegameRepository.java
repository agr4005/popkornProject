package com.teamstatic.popkornback.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.entity.Snakegame;

public interface SnakegameRepository extends JpaRepository<Snakegame, String>{
    
    @Query(value = "SELECT * FROM snakegame ORDER BY record DESC LIMIT 3", nativeQuery = true)
    List<Snakegame> findTop3Records();
}
