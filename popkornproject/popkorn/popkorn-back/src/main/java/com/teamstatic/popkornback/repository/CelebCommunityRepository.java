package com.teamstatic.popkornback.repository;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Celebcommunity;
import java.util.List;


public interface CelebCommunityRepository extends JpaRepository<Celebcommunity, Long>{
    
    List<Celebcommunity> findByArtistOrderByRegdateDesc(String artist);

}
