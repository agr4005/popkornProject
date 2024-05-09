package com.teamstatic.popkornback.controller;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.hibernate.annotations.common.util.impl.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.teamstatic.popkornback.entity.Attendance;
import com.teamstatic.popkornback.jwtToken.TokenProvider;
import com.teamstatic.popkornback.service.AttendanceService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@CrossOrigin("*")
@Controller
@RequestMapping("/api/attendance")
@AllArgsConstructor
public class AttendanceController {

    AttendanceService aService;
    TokenProvider tokenProvider;

    @GetMapping("/insert")
    public String requestMethodName(String id, String token, Model model) {
        ZonedDateTime seoulTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalTime currentTime = seoulTime.toLocalTime();
        LocalTime startAttendanceTime = LocalTime.of(8, 30); // 8:30
        LocalTime startLateTime = LocalTime.of(10, 1); // 10:01
        LocalTime endLateTime = LocalTime.of(12, 30); // 12:30

        log.info(id+"----------"+token);

        if ("null".equals(id) || "null".equals(token)) {
            model.addAttribute("message", "로그인 후 이용해주시기 바랍니다.");
            return "attendance";
        }

        // 만약 현재 시간이 출석 가능한 시간 범위를 벗어나면 메세지를 전달하고 메서드를 종료
        if (currentTime.isBefore(startAttendanceTime) || currentTime.isAfter(endLateTime)) {
            model.addAttribute("message", "출석 가능한 시간은 오전 8시 30분부터 오후 12시 30분까지입니다.");
            return "attendance";
        }

        // 현재 날짜와 시간을 가져옴
        LocalDateTime seoulLocalDateTime = seoulTime.toLocalDateTime();

        // Check if attendance for today exists
        List<Attendance> attendanceExists = aService.checkAttendanceByDate(id, seoulLocalDateTime.toLocalDate());

        // 출석 체크가 이미 되어있으면 메세지를 전달하고 메서드를 종료
        if (attendanceExists.size() > 0) {
            model.addAttribute("message", "출석을 이미 완료 하셨습니다.");
            return "attendance";
        }

        Map<String, Object> userData = tokenProvider.validateToken(token);
        

        // 권한 정보를 문자열로 변환하여 List<String>으로 가져옵니다.
        List<String> roleList = (List<String>) userData.get("roleList");
        log.info(""+roleList);

        // "MANAGER" 이상의 권한이 있는 경우 true를 반환합니다.
        if (roleList.contains("MANAGER")) {
            // 출석 가능한 시간 내에 있고 출석 체크가 안된 경우
            String status;
            if (currentTime.isBefore(startLateTime)) { // 8:30 ~ 10:00
                status = "attendance";
            } else if (currentTime.isBefore(endLateTime)) { // 10:01 ~ 12:30
                status = "late";
            } else { // 12:30 이후
                status = "absence";
            }

            // 출석 상태에 따라 처리
            Attendance entity = Attendance.builder().id(id).status(status).regdate(seoulLocalDateTime).build();
            aService.save(entity);
            model.addAttribute("message", "출석이 완료되었습니다.");

        } else {
            model.addAttribute("message", "popkorn 직원이 아닙니다.");
        }

        return "attendance";
    }

    @GetMapping("/check")
    @ResponseBody
    public ResponseEntity<List<Attendance>> attendanceCheck(@RequestParam String id) {
        ZonedDateTime seoulTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime seoulLocalDateTime = seoulTime.toLocalDateTime();

        List<Attendance> entity = aService.checkAttendanceByDate(id, seoulLocalDateTime.toLocalDate());

        if (entity.size() > 0) {
            return ResponseEntity.status(HttpStatus.OK).body(entity);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }

    @GetMapping("/findall")
    public ResponseEntity<List<Attendance>> findAll() {
        List<Attendance> attendanceList = aService.findAll();

        return ResponseEntity.status(HttpStatus.OK).body(attendanceList);
    }

}
