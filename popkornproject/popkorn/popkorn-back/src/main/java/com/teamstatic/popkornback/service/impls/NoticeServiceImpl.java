package com.teamstatic.popkornback.service.impls;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import com.teamstatic.popkornback.entity.Notices;
import com.teamstatic.popkornback.repository.NoticeRepository;
import com.teamstatic.popkornback.service.NoticeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService{

    final NoticeRepository nRepository;

    public Notices save(Notices notice) {
        return nRepository.save(notice);
    }

    public List<Notices> findAll() {
        return nRepository.findAll(Sort.by(Sort.Direction.DESC, "regdate"));
    }
    
    
}
