package com.teamstatic.popkornback.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.entity.User;


public interface UserRepository extends JpaRepository<User, String> {

    @Query(value = "SELECT * FROM user u WHERE " +
            "u.id LIKE %:keyword% OR " +
            "u.nickname LIKE %:keyword% OR " +
            "u.reword LIKE %:keyword% OR " +
            "u.status LIKE %:keyword% OR " +
            "u.createDate LIKE %:keyword%", nativeQuery = true)
    Page<User> findAllByKeywordLike(String keyword, Pageable pageable);

    List<User> findByStatus(String status);

    @Query(value = "SELECT * FROM user u WHERE id = :id", nativeQuery = true)
    User findByUserId(String id);

    Long countByStatus(String status);

    @EntityGraph(attributePaths = {"roleList"}) 
	// => "roleList": Member 엔티티의 
	//     @ElementCollection(fetch = FetchType.LAZY) 로 정의한 속성
	@Query("select u from User u where u.id = :id")
	User getWithRoles(String id);

}
