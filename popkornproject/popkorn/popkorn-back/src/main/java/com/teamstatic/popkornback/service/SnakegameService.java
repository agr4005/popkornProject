package com.teamstatic.popkornback.service;

import java.util.List;
import java.util.Optional;

import com.teamstatic.popkornback.entity.Snakegame;

public interface SnakegameService {
    
    List<Snakegame> findTop3RecordsAndMe(String nickname);

    Optional<Snakegame> findById(String nickname);

    void save(Snakegame entity);

}
