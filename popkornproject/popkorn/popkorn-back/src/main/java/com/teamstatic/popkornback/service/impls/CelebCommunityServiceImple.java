package com.teamstatic.popkornback.service.impls;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.Celebcommunity;
import com.teamstatic.popkornback.repository.CelebCommunityRepository;
import com.teamstatic.popkornback.service.CelebCommunityService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CelebCommunityServiceImple implements CelebCommunityService {
    
    final CelebCommunityRepository ccRepository;

    public List<Celebcommunity> findByArtist(String artist){
        return ccRepository.findByArtistOrderByRegdateDesc(artist);
        
    };

    public void save(Celebcommunity entity){
        ccRepository.save(entity);
    }

}
