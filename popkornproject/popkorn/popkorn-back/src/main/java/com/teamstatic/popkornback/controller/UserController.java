package com.teamstatic.popkornback.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.UserDTO;
import com.teamstatic.popkornback.domain.UserRole;
import com.teamstatic.popkornback.entity.Snakegame;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.jwtToken.TokenProvider;
import com.teamstatic.popkornback.repository.UserRepository;
import com.teamstatic.popkornback.service.SnakegameService;
import com.teamstatic.popkornback.service.impls.RegisterMail;
import com.teamstatic.popkornback.service.impls.UserServiceImple;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    UserServiceImple uservice;
    PasswordEncoder passwordEncoder;
    RegisterMail registerMail;
    TokenProvider tokenProvider;
    SnakegameService sgService;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/userlist")
    public PageResultDTO<UserDTO, User> userList(int page) {
        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(page)
                .size(20)
                .build();

        PageResultDTO<UserDTO, User> resultDTO = uservice.pageList(requestDTO);
        resultDTO.setDashboard1(uservice.countByStatus("admin"));
        resultDTO.setDashboard2(uservice.countByStatus("signed"));
        resultDTO.setDashboard3(uservice.countByStatus("unsigned"));

        return resultDTO;
    }

    @GetMapping("/adminlist")
    public List<User> adminList(Pageable pageable) {

        List<User> userlist = uservice.findByStatus("admin");

        return userlist;
    }

    @GetMapping("/searchlist")
    public PageResultDTO<UserDTO, User> searchlist(String keyword, int page) {

        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(page)
                .size(20)
                .keyword(keyword)
                .build();

        PageResultDTO<UserDTO, User> resultDTO = uservice.findAllByKeywordLike(keyword, requestDTO);
        resultDTO.setDashboard1(uservice.countByStatus("admin"));
        resultDTO.setDashboard2(uservice.countByStatus("signed"));
        resultDTO.setDashboard3(uservice.countByStatus("unsigned"));

        return resultDTO;
    }

    @GetMapping("/delete")
    public PageResultDTO<UserDTO, User> userDelete(@RequestParam String id) {
        uservice.deleteById(id);
        return userList(1);
    }

    @GetMapping("/selectone")
    public User selectone(@RequestParam String id) {
        User user = uservice.findByUserId(id);

        if (user != null) {
            return user;
        } else {
            return null;
        }
    }

    @GetMapping("/emailcheck")
    public String emailcheck(@RequestParam String emailinput) {
        User user = uservice.findByUserId(emailinput);

        if (user != null) {
            return "success";
        } else {
            return "failed";
        }
    }

    @PostMapping("/login")
    public UserDTO login(@RequestBody Map<String, String> requestBody) {
        String emailinput = requestBody.get("emailinput");
        String pwinput = requestBody.get("pwinput");

        User user = uservice.findByUserId(emailinput);

        if (user != null) {
            String password = user.getPassword();
            if (passwordEncoder.matches(pwinput, password)) {
                final String token = tokenProvider.createToken(user.claimList());
                final UserDTO userDTO = UserDTO.builder()
                        .token(token)
                        .id(user.getId())
                        .nickname(user.getNickname())
                        .roleList(user.getRoleList())
                        .build();
                return userDTO;

            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @GetMapping("/logout")
    public void logout() {

    }

    @PostMapping("/memberjoin")
    public String memberJoin(@RequestBody UserDTO dto) {

        ZonedDateTime seoulTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime seoulLocalDateTime = seoulTime.toLocalDateTime();

        User user = new User();

        user.setId(dto.getId());
        user.setPassword(dto.getPassword());
        user.setNickname(dto.getNickname());
        user.setCreatedate(seoulLocalDateTime);
        user.setStatus("signed");

        user.addRole(UserRole.USER);

        String encodedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        try {
            uservice.save(user);
            return "회원가입 성공";
        } catch (Exception e) {
            return "회원가입 실패";
        }
    }

    @PostMapping("/mailConfirm")
    @ResponseBody
    String mailConfirm(@RequestBody Map<String, String> requestData) throws Exception {
        String email = requestData.get("email");
        String code = registerMail.sendSimpleMessage(email);
        return code;
    }

    @PostMapping("/updatepassword")
    public String updatePassword(@RequestBody Map<String, String> requestBody) {
        String emailinput = requestBody.get("emailinput");
        String pwinput = requestBody.get("pwinput");
        User optionalUser = uservice.findByUserId(emailinput);

        if (optionalUser != null) {
            User user = optionalUser;
            String encodedPassword = passwordEncoder.encode(pwinput);
            user.setPassword(encodedPassword);

            try {
                uservice.save(user);
                return "비밀번호 변경 성공";
            } catch (Exception e) {
                return "비밀번호 변경 실패";
            }
        } else {
            return "사용자를 찾을 수 없습니다.";
        }
    }

    @PostMapping("/passwordcheck")
    public Boolean passwordCheck(@RequestBody Map<String, Object> request) {
        String currentpw = (String) request.get("currentpw");
        String userId = (String) request.get("userId");
        if (userId != null) {
            User userOptional = uservice.findByUserId(userId);
            if (userOptional != null) {
                User user = userOptional;
                boolean passwordMatch = passwordEncoder.matches(currentpw, user.getPassword());
                return passwordMatch;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @PostMapping("/redesignpassword")
    public String redesignpassword(@RequestBody Map<String, Object> request) {

        String userId = (String) request.get("userId");
        String newpassword = (String) request.get("newpassword");
        if (userId != null) {
            User userOptional = uservice.findByUserId(userId);
            User user = userOptional;
            String encodedPassword = passwordEncoder.encode(newpassword);
            user.setPassword(encodedPassword);
            try {
                uservice.save(user);
                return "Change Password Complete";
            } catch (Exception e) {
                return "Change Password Failed. Please retry.";
            }
        } else {
            return "사용자를 찾을 수 없습니다.";
        }
    }

    @PostMapping("/updatenickname")
    public String updatenickname( @RequestParam String email,
            @RequestParam String nickname) {
        User userOptional = uservice.findByUserId(email);
        User user = userOptional;
        user.setNickname(nickname);
        try {
            uservice.save(user);
            return user.getNickname();
        } catch (Exception e) {
            return "닉네임 변경 실패";
        }
    }

    @GetMapping("/{email}/nickname")
    public String getUserNickname(@PathVariable String email) {
        User userOptional = uservice.findByUserId(email);
        User user = userOptional;
        return user.getNickname();
    }

    @GetMapping("/{email}/nickname-reword")
    public Map<String, Object> getUserNicknameAndReword(@PathVariable String email) {
        User userOptional = uservice.findByUserId(email);
        User user = userOptional;

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("nickname", user.getNickname());
        responseData.put("reword", user.getReword());

        return responseData;
    }

    @DeleteMapping("/withdraw")
    public String withdraw(@RequestBody Map<String, Object> request) {
        String userId = (String) request.get("userId");

        try {
            uservice.deleteById(userId);

            return "회원 탈퇴 성공";
        } catch (Exception e) {
            return "탈퇴중 오류 발생";
        }
    }

    @GetMapping("/orderlist")
    List<User> orderlist(String status) {

        return uservice.findByStatus(status);
    }

    @PostMapping("/resetpassword")
    public String resetpassword(@RequestBody Map<String, Object> request) {

        String ordernuminput = (String) request.get("ordernuminput");
        String newpassword = (String) request.get("newpassword");
        if (ordernuminput != null) {
            User userOptional = uservice.findByUserId(ordernuminput);
            User user = userOptional;
            String encodedPassword = passwordEncoder.encode(newpassword);
            user.setPassword(encodedPassword);
            try {
                uservice.save(user);
                return "Change Password Complete";
            } catch (Exception e) {
                return "Change Password Failed. Please retry.";
            }
        } else {
            return "사용자를 찾을 수 없습니다.";
        }
    }

    @PostMapping("/mailsend")
    public String sendEmail(@RequestBody Map<String, String> requestData) {
        String emailRecipient = requestData.get("emailRecipient");
        String emailTitle = requestData.get("emailTitle");
        String emailContent = requestData.get("emailContent");

        try {
            registerMail.sendEmail(emailRecipient, emailTitle, emailContent);
            return "Email sent successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send email";
        }
    }

    @PostMapping("/sendtoallusers")
    public String sendtoallusers(@RequestBody Map<String, String> requestData) {
        String emailTitle = requestData.get("emailTitle");
        String emailContent = requestData.get("emailContent");

        List<User> users = userRepository.findAll();

        List<User> filteredUsers = new ArrayList<>();
        for (User user : users) {
            if (!isNotEmailFormat(user.getId())) {
                filteredUsers.add(user);
            }
        }

        for (User user : filteredUsers) {
            try {
                registerMail.sendEmail(user.getId(), emailTitle, emailContent);
            } catch (Exception e) {
                e.printStackTrace();
                return "Failed to send email";
            }
        }

        return "Email sent successfully";
    }

    private boolean isNotEmailFormat(String input) {

        return !input.contains("@");
    }

    @GetMapping("/rewordcheck")
    public String rewordcheck(@RequestParam String storedLoginID) {
        User user = uservice.findByUserId(storedLoginID);
        if (user != null) {
            int reword = user.getReword();
            return reword + "";
        } else {
            return "failed";
        }
    }

    @PostMapping("/update")
    public User update(@RequestBody User updatedItem) {
        return uservice.save(updatedItem);
    }

    @PostMapping("/reducereword")
    public String reducereword(@RequestBody Map<String, String> requestData) {
        Integer useReword = Integer.parseInt(requestData.get("useReword"));
        String storedLoginID = requestData.get("storedLoginID");

        User user = userRepository.findByUserId(storedLoginID);

        if (user != null) {
            int reword = user.getReword();
            user.setReword(reword - useReword);
            userRepository.save(user);

            return "rewords reduce";
        } else {
            return "User not found";
        }
    }

@PostMapping("/authcheck")
    public Boolean postMethodName() {
        // SecurityContext에서 Authentication 객체를 가져옵니다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증된 사용자의 권한을 가져옵니다.
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        // 권한 정보를 문자열로 변환하여 List<String>으로 가져옵니다.
        List<String> roleList = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        System.out.println(roleList);

        // "ROLE_MANAGER" 이상의 권한이 있는 경우 true를 반환합니다.
        return roleList.contains("ROLE_MANAGER");

    }

        @PostMapping("/snakegame/getrecord")
    public List<Snakegame> getRecord(@RequestBody String nickname) {
        String result = nickname.replace("\"", "");
        return sgService.findTop3RecordsAndMe(result);
    }
    
    @PostMapping("/snakegame/insertrecord")
    public List<Snakegame> postMethodName(@RequestBody Snakegame entity) {
        
        entity.setNickname(entity.getNickname().replace("\"", ""));
        Optional<Snakegame> userhistory = sgService.findById(entity.getNickname());
    

        if(!userhistory.isPresent() || userhistory.get().getRecord()<entity.getRecord()){
            sgService.save(entity);
        }

        return sgService.findTop3RecordsAndMe(entity.getNickname());
    }
    
}
