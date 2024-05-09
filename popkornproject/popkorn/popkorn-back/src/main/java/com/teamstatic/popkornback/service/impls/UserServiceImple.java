package com.teamstatic.popkornback.service.impls;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.UserDTO;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.repository.UserRepository;
import com.teamstatic.popkornback.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImple implements UserService{
    
    final UserRepository uRepository;
    
    public PageResultDTO<UserDTO, User> pageList(PageRequestDTO requestDTO) {
		
		// => 조건 완성
		Pageable pageable = requestDTO.getPageable(Sort.by("createdate").descending());

		// => repository 실행
		Page<User> result = uRepository.findAllByKeywordLike(requestDTO.getKeyword(), pageable);
		
//		Function<Guestbook, GuestbookDTO> fn = entity -> entityToDto(entity);
		// Function 인터페이스는 함수형 인터페이스
		// 그러므로 익명객체 문법, 람다를 사용하여 fn 초기화	
		// entity 와 함께 entity를 dto 로 바꿔주는 entityToDto메서드 전달 
		// 람다식을 인자로 직접 사용해도 됨 (이로서 JAVA 도 함수형 언어라 할 수 있게 됨)
		
		return new PageResultDTO<>( result, entity -> entityToDto(entity) );
	}

	
    @Override
    public PageResultDTO<UserDTO, User> findAllByKeywordLike(String keyword, PageRequestDTO requestDTO) {
        		
		// => 조건 완성
		Pageable pageable = requestDTO.getPageable(Sort.by("createdate").descending());

		// => repository 실행
		Page<User> result = uRepository.findAllByKeywordLike(keyword, pageable);
		
//		Function<Guestbook, GuestbookDTO> fn = entity -> entityToDto(entity);
		// Function 인터페이스는 함수형 인터페이스
		// 그러므로 익명객체 문법, 람다를 사용하여 fn 초기화
		// entity 와 함께 entity를 dto 로 바꿔주는 entityToDto메서드 전달 
		// 람다식을 인자로 직접 사용해도 됨 (이로서 JAVA 도 함수형 언어라 할 수 있게 됨)
		
		return new PageResultDTO<>( result, entity -> entityToDto(entity) );
    }


    public List<User> findAll(){
        return uRepository.findAll();
    };

	public User findByUserId(String id){
		return uRepository.findByUserId(id);
	}

    public List<User> findByStatus(String status){
        return uRepository.findByStatus(status);
    }

	// => delete
	@Override
	public void deleteById(String id) {
		uRepository.deleteById(id);
	}

    public Long countByStatus(String status){
        return uRepository.countByStatus(status);
    }

	public User save(User user) {
			return uRepository.save(user);
	}

	
}