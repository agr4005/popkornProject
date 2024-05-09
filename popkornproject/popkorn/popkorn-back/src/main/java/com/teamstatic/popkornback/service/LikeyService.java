package com.teamstatic.popkornback.service;

import java.util.List;

import com.teamstatic.popkornback.entity.Likey;

public interface LikeyService {

    Likey save(Likey likey);

    void delete(Likey likey);

    List<Likey> findByIdAndArtist(String id, String artist);

    List<Likey> findById(String id);

    void deleteByIdAndArtist(String id, String artist);

    int countByArtist(String artist);

}
