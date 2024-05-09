package com.teamstatic.popkornback.service.impls;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.Celeb;
import com.teamstatic.popkornback.repository.CelebRepository;
import com.teamstatic.popkornback.service.CelebService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class CelebServiceImple implements CelebService{

   final CelebRepository celebRepository;

   public List<Celeb> findAll(){
      return celebRepository.findAll();
   }

   public Celeb save(Celeb celeb) {
      return celebRepository.save(celeb);
   }

   @Transactional
   public void deleteByartist(String artist) {
      celebRepository.deleteByartist(artist);
   }

}
