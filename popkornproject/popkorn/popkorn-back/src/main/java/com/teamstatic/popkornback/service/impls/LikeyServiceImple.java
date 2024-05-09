package com.teamstatic.popkornback.service.impls;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.teamstatic.popkornback.entity.Likey;
import com.teamstatic.popkornback.repository.LikeyRepository;
import com.teamstatic.popkornback.service.LikeyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikeyServiceImple implements LikeyService{
    
    final LikeyRepository lRepository;


    public Likey save(Likey likey){
        return lRepository.save(likey);
    };

    public void delete(Likey likey){
        lRepository.delete(likey);
    }

    public List<Likey> findByIdAndArtist(String id, String artist){
        return lRepository.findByIdAndArtist(id, artist);
    }

    public List<Likey> findById(String id){
        return lRepository.findById(id);
    }

    @Transactional
    public void deleteByIdAndArtist(String id, String artist){
        lRepository.deleteByIdAndArtist(id, artist);
    }

    public int countByArtist(String artist){
        return lRepository.countByArtist(artist);
    }

}
