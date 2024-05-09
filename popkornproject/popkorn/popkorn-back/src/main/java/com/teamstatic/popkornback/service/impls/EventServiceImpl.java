package com.teamstatic.popkornback.service.impls;

import java.time.LocalDate;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.domain.EventDTO;
import com.teamstatic.popkornback.entity.Event;
import com.teamstatic.popkornback.repository.EventRepository;
import com.teamstatic.popkornback.service.EventService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@EnableScheduling
public class EventServiceImpl implements EventService {

    final EventRepository eRepository;

    public List<Event> findAll() {
        return eRepository.findAll();
    }

    @Transactional
    @Scheduled(cron = "00 50 23 * * *") // 매일 자정에 실행
    public void deleteExpiredEvents() {
    ZonedDateTime seoulTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDate seoulLocalDate = seoulTime.toLocalDate();
        eRepository.deleteAllByEnddate(seoulLocalDate);
    }

    @Transactional
    public void deleteByecode(int ecode) {
        eRepository.deleteByecode(ecode);
    }

   public Event save(Event event) {
        return eRepository.save(event);
   }
}
