package com.teamstatic.popkornback.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Notices;

public interface NoticeRepository extends JpaRepository<Notices, Integer>{
}
