package com.teamstatic.popkornback.service;

import java.util.List;

import com.teamstatic.popkornback.entity.Celebcommunity;

public interface CelebCommunityService {
    
    List<Celebcommunity> findByArtist(String artist);

    void save(Celebcommunity entity);

}
