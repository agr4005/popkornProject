package com.teamstatic.popkornback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Celeb;

public interface CelebRepository extends JpaRepository<Celeb, String>{
   void deleteByartist(String artist);
}
