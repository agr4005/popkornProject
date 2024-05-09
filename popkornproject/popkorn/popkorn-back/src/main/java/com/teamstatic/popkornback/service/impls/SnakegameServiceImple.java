package com.teamstatic.popkornback.service.impls;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.Snakegame;
import com.teamstatic.popkornback.repository.SnakegameRepository;
import com.teamstatic.popkornback.service.SnakegameService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SnakegameServiceImple implements SnakegameService{
    
    final SnakegameRepository sgRepository;

    public List<Snakegame> findTop3RecordsAndMe(String nickname){
        List<Snakegame> resultList = new ArrayList<>();

        // 상위 3개의 기록 가져오기
        List<Snakegame> top3Records = sgRepository.findTop3Records();

        // 사용자의 기록 가져오기
        Optional<Snakegame> userRecord = sgRepository.findById(nickname);

        // 결과 리스트에 사용자의 기록을 맨 앞에 추가
        if (userRecord.isPresent()) {
            resultList.add(userRecord.get());
        } else {
            resultList.add(new Snakegame(nickname, 0));
        }

        // 결과 리스트에 상위 3개의 기록 추가
        resultList.addAll(top3Records);

        return resultList;
        
    }

    public Optional<Snakegame> findById(String nickname){
        return sgRepository.findById(nickname);
    }

    public void save(Snakegame entity){
        sgRepository.save(entity);
    }

}
