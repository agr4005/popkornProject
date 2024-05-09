package com.teamstatic.popkornback.service;

import java.util.List;

import com.teamstatic.popkornback.domain.CelebDTO;
import com.teamstatic.popkornback.entity.Celeb;

public interface CelebService {
   
   List<Celeb> findAll();

   void deleteByartist(String artist);

   Celeb save(Celeb celeb);

   default Celeb dtoToEntity(CelebDTO cdto) {
      return Celeb.builder()
         .artist(cdto.getArtist())
         .celebimg(cdto.getCelebimg())
         .mainimg(cdto.getMainimg())
         .notice(cdto.getNotice())
         .build();
   }
}
