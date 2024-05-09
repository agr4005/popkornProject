// package com.teamstatic.popkornback;

// import java.util.List;

// import javax.transaction.Transactional;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import com.teamstatic.popkornback.domain.UserRole;
// import com.teamstatic.popkornback.entity.User;
// import com.teamstatic.popkornback.repository.UserRepository;

// import lombok.extern.log4j.Log4j2;

// @SpringBootTest
// @Log4j2
// class DemoJpaApplicationTests {

// 	//@Test
// 	void contextLoads() {
// 	}
	
// 	@Autowired
// 	private UserRepository memberRepository;
	
// 	@Autowired
// 	private PasswordEncoder passwordEncoder;
	
// 	// ** Test전 확인사항
// 	// => application.properties
// 	//	 member_member_role_list 테이블이 자동 생성될수 있도록 속성 변경하고
// 	//	 첫 실행후 생성되면 다시 원상태로 변경하기
// 	//	 spring.jpa.hibernate.ddl-auto=update	
	 
// 	// public void insertMember(){
		
// 	// 	User user = User.builder()
// 	//               .id("roletest")
// 	//               .password(passwordEncoder.encode("12345!"))
// 	//               .name("가나다")
// 	//               .age(22)
// 	//               .jno(7)
// 	//               .info("SpringBoot Security Test")
// 	//               .point(300.5)
// 	//               .birthday("2000-02-02")
// 	//               .rid("apple")
// 	//               .uploadfile("aaa.gif")
// 	//               .build();
// 	// 	// => Role 을 추가하기위해 Member 엔티티에 정의된 맴버설정 의해 
// 	// 	//    member_role_list 테이블이 자동 생성됨
// 	// 	//   (단, application.properties 의 hibernate.ddl-auto 속성확인)
// 	// 	user.addRole(UserRole.USER);
// 	// 	user.addRole(UserRole.MANAGER);
// 	// 	memberRepository.save(member);
// 	// } //insertMember
	
	
// 	public void testRead() {
		
// 		String id = "admin";
// 		User member = memberRepository.getWithRoles(id);

// 	    log.info("-----------------");
// 	    log.info(member);
// 	    // => member(id=admin, ..., roleList=[ADMIN, MANAGER, USER])
// 	} //testRead

// 	@Test
// 	// => 모든 member 에 Role 부여하기 
// 	//    member_role_list 테이블 완성
// 	// => 최초 실행시
// 	//	-> member_role_list 테이블이 자동 생성됨
// 	//	-> 이때는 application.properties 의 hibernate.ddl-auto 속성 확인
// 	// @Transactional
// public void addRole() {
//     List<User> list = memberRepository.findAll();

// 	for (User m : list) {
		
//         User user = User.builder()
//                 .id(m.getId())
//                 .password(m.getPassword())
//                 .nickname(m.getNickname())
//                 .reword(m.getReword())
//                 .createdate(m.getCreatedate())
//                 .status(m.getStatus())
//                 .build();
//         // => builder() 적용해야 Member 엔티티의 roleList가 생성됨.
//         //	  즉, roleList 가 notNull 이어야 아래구문의 addRole() 메서드로 담을수있음.

//         if (user.getId().equals("huck1217@naver.com")) {
//             user.addRole(UserRole.ADMIN);
//             user.addRole(UserRole.MANAGER);
//             user.addRole(UserRole.USER);
//         } else if (user.getId().equals("nstart97@naver.com") ||
//                    user.getId().equals("arp4005@naver.com")) {
//             user.addRole(UserRole.MANAGER);
//             user.addRole(UserRole.USER);
//         } else if (user.getId().contains("@") && user.getId().contains(".")){
//             user.addRole(UserRole.USER);
//         } else {
// 			user.addRole(UserRole.NONUSER);
// 		}

//         // 새로운 인스턴스를 생성하여 roleList를 추가한 후 저장
//         memberRepository.save(user);

//     } //for

// } //addRole

	
// } //class
