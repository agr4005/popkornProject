package com.teamstatic.popkornback.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.UserDTO;

public interface UserService {

    PageResultDTO<UserDTO, User> pageList(PageRequestDTO requestDTO);

    List<User> findAll();

    User findByUserId(String id);

    PageResultDTO<UserDTO, User> findAllByKeywordLike(String keyword, PageRequestDTO requestDTO);

    List<User> findByStatus(String status);

    void deleteById(String id);

    Long countByStatus(String status);

    User save(User user);

    default User dtoToEntity(UserDTO dto) {
        return User.builder()
                .id(dto.getId())
                .password(dto.getPassword())
                .nickname(dto.getNickname())
                .reword(dto.getReword())
                .createdate(LocalDateTime.now())
                .status(dto.getStatus()).build();
    }

    default UserDTO entityToDto(User entity) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formattedDateTime = LocalDateTime.now().format(formatter);
        return UserDTO.builder()
                .id(entity.getId())
                .password(entity.getPassword())
                .nickname(entity.getNickname())
                .reword(entity.getReword())
                .createdate(formattedDateTime)
                .status(entity.getStatus()).build();
    }

}
