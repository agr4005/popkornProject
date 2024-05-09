package com.teamstatic.popkornback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Likey;
import java.util.List;


public interface LikeyRepository extends JpaRepository<Likey, Long>{
    
    List<Likey> findByIdAndArtist(String id, String artist);

    List<Likey> findById(String id);

    void deleteByIdAndArtist(String id, String artist);

    int countByArtist(String artist);
}
