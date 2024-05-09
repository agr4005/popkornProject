package com.teamstatic.popkornback.jwtToken;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.teamstatic.popkornback.domain.UserRole;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.repository.UserRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// ** 인증필터(AuthenticationFilter) 클래스 만들기 & 등록하기
// => 등록: SecurityConfig.java 의 filterChain 메서드 참고
// => 스프링 시큐리티의 filter는
//	  javax.servlet.Filter 인터페이스를 구현해서 커스텀 Filter를 구현할 수 있다
// => OncePerRequestFilter 상속받아 생성
// => Filter(i) -> GenericFilterBean(a) -> OncePerRequestFilter(a)
//    -> JwtAuthenticationFilter

// ** OncePerRequestFilter
// => https://hongdosan.tistory.com/entry/JWT-OncePerRequestFilter-Filter
// => 원문번역
//	  어느 Servlet Container 에서나 요청당 한번의 실행을 보장하는것을 목표로 한다.
//	  doFilterInternal 메소드와 HttpServletRequest 와 HttpServletResponse 인자를 제공한다.
//	  즉, 요청당 한번의 실행을 보장한다.

// => 요약하면 OncePerRequestFilter 는
//	  모든 서블릿에 일관된 요청을 처리하기 위해 만들어진 Filter.
//	  이 추상 클래스를 구현한 Filter는 사용자의 요청당 딱 한번만 실행되는 Filter를 만들수있다.
// => 비교하면 Filter 또는 Filter를 더 확장한 GenericFilterBean 을 상속받아 사용하는 경우에는
//    앞서 거친 Filter들을 또한번 거치는, 쓸데없는 자원낭비가 일어나는데 이를 방지해준다.

// ** doFilter() 와 doFilterInternal()
// => 인증처리를 담당함.
// => 일반적으로 구현된 필터는 아래 두가지 케이스가 존재함.

// => Filter인터페이스의 doFilter를 직접 구현한 필터
//	  doFilter메서드를 호출하면 사용자가 구현한 로직이 바로 실행

// => Filter인터페이스의 doFilter를 구현한 필터클래스를 상속하여 doFilterInternal 을 구현한 필터
//	  위의 OncePerRequest필터처럼 doFilter메서드를 OncePerRequest필터 안에서 구현하고
//	  doFilter에서 doFilterInternal을 호출하는 방식이다.
//	  doFilterInternal은 추상메서드 이므로 사용자가 직접 구현해야함 (아래코드 참고)

// ** doFilter
// => url-pattern에 맞는 모든 HTTP 요청이 디스패처 서블릿으로 전달되기 전에 웹 컨테이너에 의해 실행되는 메소드
//    doFilter의 파라미터로는 FilterChain이 있는데, FilterChain의 doFilter 통해 다음 대상으로 요청을 전달하게 된다.
//    chain.doFilter() 전/후에 우리가 필요한 처리 과정을 넣어줌으로써 원하는 처리를 진행할 수 있다.
//  
// => 스프링 Filter 동작과정
//	https://emgc.tistory.com/125
//	https://mangkyu.tistory.com/173 참고
// ---------------------------------------------------------

// ** String 의 주요메서드
// => startsWith() : 어떤 String이 특정 문자열로 시작하는지를 boolean 타입으로 리턴
// => endsWith() : 특정 문자열로 끝나는지 boolean 타입으로 리턴.
// => a.equalsIgnoreCase(b) : a와 b가 똑같은지 확인하는 메서드이며, 대소문자 구분없이 비교함.

@Log4j2
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private TokenProvider tokenProvider;
	@Autowired
	private UserRepository memberRepository;

	// ** doFilterInternal 메서드는 인증처리를 담당
	
	// 1. Role 을 token 에 포함하기전
	//@Override
	protected void doFilterInternal_OLD(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		try {
			// 1) request 에서 토큰 가져오기.
			String token = parseBearerToken(request);  //아래에 메서드 구현해놓음
			log.info("** JwtAuthenticationFilter.java, doFilterInternal(), token 확인=> "+token);
			
			if (token != null && !token.equalsIgnoreCase("null")) {
				
				// 2) 토큰 검증 & userId 가져오기
				// => JWT이므로 Authorization(인가) 서버에 요청하지않고 검증가능함.
				// => TokenProvider 의 검증메서드를 통해 검증후 id 전달받음 (위조된 경우 예외처리 됨)
				String userId = tokenProvider.validateAndGetUserId(token);
				log.info("** Authenticated 결과 userId : " + userId );
				
				// 3) 인증 완료
				// => 스프링시큐리티의 인증과정 ( https://ittrue.tistory.com/287 참고)
				//	-> id, password 등 인증정보 전달 
				//  -> UsernamePasswordAuthenticationToken 에 보관
				//	-> 인증절차 완료 (여기서는 토큰이 있으므로 필요없음) 
				//  -> SecurityContextHolder를 이용하여 SecurityContext에 인증된 Authentication을 저장 
				//	   ( SecurityContextHolder에 등록해야 인증된 user로 인식함)
				
				// => UsernamePasswordAuthenticationToken
				//    스프링 시큐리티에서 Username과 Password로 인증하기 위해 필요한 토큰.
				//    위의 토큰에서 전달받은 사용자의 인증정보가 UsernamePasswordAuthenticationToken에 포함되어 
				//    Authentication 객체 형태로 SecurityContext에 저장된다.   
				
				// => 생성자: UsernamePasswordAuthenticationToken(principal, credentials, authorities) 
				//	- principal: 객체형, AuthenticationPrincipal(인증정보 or 인증본인) 이며 @AuthenticationPrincipal 로 제공받을수있음.
				//	- credentials: 객체형, Password를 의미하며 보통은 null 로 처리
				//	- authorities: 권한목록, Collection<? extends GrantedAuthority> Type 
				//					인증된 권한목록이므로 Collection 의 Type이 제한됨 	
				/*	- 생성자 소스 참고
					public UsernamePasswordAuthenticationToken(Object principal, Object credentials,
							Collection<? extends GrantedAuthority> authorities) {
						super(authorities);
						this.principal = principal;
						this.credentials = credentials;
						super.setAuthenticated(true); // must use super, as we override
					}
				*/
				
				// ** AuthorityUtils
				// => 스프링의 org.springframework.security.core.authority 패키지에 있는
				//	  List<GrantedAuthority> 를 만들어 주는 유틸리티 클래스임.
				//	  즉, Collection<? extends GrantedAuthority> getAuthorities() 메서드를 만들어줌.
				//	( https://blog.naver.com/misschip/222059488541 참고 ) 
				// => 방법	
				//	1) commaSeparatedStringToAuthorityList() 
				//		List<GrantedAuthorities> authorities =
				//		AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_ADMIN,ROLE_USER");	
				
				//	2) createAuthorityList() 메서드를 쓰면 된다.
				//​		List<GrantedAuthorities> authorities =
				//		AuthorityUtils.createAuthorityList("ROLE_ADMIN","ROLE_MANAGER","ROLE_USER");
				//		=> Role은 앞에 ROLE_ 을 붙여주어야 인식을 함. 
				//			( SpringBoot 3.~~ 부터 변경됨, https://krksap.tistory.com/2194 )
				
				// ** authorities 가져와 스프링 시큐리티가 인가할수 있도록 
				//	  	UsernamePasswordAuthenticationToken 생성자로 전달하기
				// => authorities 가져오기
				User member = memberRepository.getWithRoles(userId);
				log.info("** Authenticated getMemberRoleList => "+member.getRoleList());
				// => List -> ROLE_USER 형식 String 으로 변환후 인자로 넣어주기만 하면 됨
				String roleList ="";
				for (UserRole r : member.getRoleList()) {
					roleList += ",ROLE_"+r;
				}
				roleList=roleList.substring(1); // 첫번째 "," 없애기 위함 
				log.info("** Authenticated 완성된 roleList => "+roleList);
				
				AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
								userId, 
								// => 인증된 사용자정보, 모든 객체형 사용가능 
								//   (보통은 스프링에서 제공하는 interface UserDetails 를 사용하기도함) 
								// => 컨트롤러에서 @AuthenticationPrincipal 로 제공받음
								//	 (AuthController 의 userDetail() 에서 확인) 	
								null, // Password를 의미하며 보통은 null 로 처리
								AuthorityUtils.commaSeparatedStringToAuthorityList(roleList) 
								// => member.getMemberRoleList() 에서 읽은 권한목록을 인자값 형식에 맞게 전달
				);
				
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				// => details 필드에 인증 소스인 request 값 set 
				
				// => SecurityContextHolder에 인증된 user등록.
				//    SecurityContextHolder에 등록해야 인증된 user라고 생각하고, user를 인식한다.
				//	-> SecurityContextHolder.createEmptyContext() 메서드로 SecurityContext 생성하고
				//  -> 여기에 SecurityContext 에 인증정보를 넣고
				//  -> 다시 SecurityContextHolder 에 컨텍스트로 등록함.
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				securityContext.setAuthentication(authentication);
				SecurityContextHolder.setContext(securityContext);
			}
		} catch (Exception ex) {
			log.error("Could not set user authentication in security context", ex);
		}

		filterChain.doFilter(request, response);

	} //doFilterInternal
	
	// 2. Role을 token에 포함한 이후
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		try {
			// 1) request 에서 토큰 가져오기.
			String token = parseBearerToken(request);  //아래에 메서드 구현해놓음
			log.info("** JwtAuthenticationFilter.java, doFilterInternal(), token 확인=> "+token);
			
			if (token != null && !token.equalsIgnoreCase("null")) {
				
				// 2) 토큰 검증 & claims 가져오기
				Map<String, Object> claims = tokenProvider.validateToken(token);
				log.info("** Authenticated 결과 JWT claims: " + claims);
				String userId = (String) claims.get("userId");
				//String pw = (String) claims.get("pw");
				List<String> roleList = (List<String>)claims.get("roleList");
				
				// 3) 인증 완료
				// => 인증결과를 UsernamePasswordAuthenticationToken 에 담아 시큐리티가 사용하는 인증토큰을 만들고
				// => 이 인증토큰 값(Authentication)을 SecurityContextHolder를 이용하여 SecurityContext에 등록
				//	  ( SecurityContextHolder에 등록해야 인증된 user로 인식함)
				
				AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userId, // 컨트롤러에서 @AuthenticationPrincipal 로 사용가능 (AuthController userDetail() 확인) 
						null, // Password를 의미하며 보통은 null 로 처리
						roleList.stream()
								.map(str -> new SimpleGrantedAuthority("ROLE_"+str))
								.collect(Collectors.toList()) );
						// => Collection<? extends GrantedAuthority> Type 에 맞추기 위함
				
				//=> 아래의 경우처럼 객체를 생성자의 principal 로 전달할수도 있음  	
				// MemberDTO memberDTO = new MemberDTO(userId, pw, ~~~ , roleNames);
				// ~~~ = new UsernamePasswordAuthenticationToken(memberDTO, pw, memberDTO.getAuthorities());
				
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				// => details 필드에 인증 소스인 request 값 set 
				
				// => SecurityContextHolder에 인증된 user등록.
				//	  ( 그래야만 인증된 user로 인식함)
				//	-> SecurityContext 생성
				//	-> 여기에 인증정보를 넣고
				//	-> 이렇게 인증정보를 담은 SecurityContext 를 SecurityContextHolder에 등록함.
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				securityContext.setAuthentication(authentication);
				SecurityContextHolder.setContext(securityContext);
			} //if_token 존재
		} catch (Exception ex) {
			log.error("Could not set user authentication in security context", ex);
		}

		filterChain.doFilter(request, response);

	} //doFilterInternal

	// ** Bearer Token
	// => HTTP통신에서 사용하는 인증 방식에 Bearer Authentication을 사용하는 것이다.
	// => Bearer Authentication이란, "이 토큰을 나르는(bearer) 사람에게 권한을 부여하시오"라는 것
	
	// ** StringUtils
	// => import org.springframework.util.StringUtils;
	// => 거의 대부분의 문자열 처리를 수행할 수 있음.
	// => 파라미터 값으로 null을 주더라도 NullPointException을 발생시키지 않고, 
	//    메서드에 따라 알맞은 결과를 리턴한다.
	// => 주요 method 정리
	//	- hasText() : null, 길이 0, 공백("" or " ") 중 하나라도 있으면 false를 반환함.
	// 	- hasLength() : null 체크 후, 길이가 0인지 판별한다.
	//				 	( 공백만 있는 문자열, " " 도 true가 반환되는 점을 주의 )
	//					공백으로만 이루어졌더라도 상관없이 null 체크와 길이가 1 이상인지 확인할때 사용.
	// 	- isEmpty() : null, 길이 0, 공백("" or " ") 중 하나라도 있으면 false를 반환함. (위의 hasText() 권장함) 
	// 	- deleteWhitespace() , trim() : 문자열에 공백 문자가 있으면 모두 제거
	// 	- equals() : 파라미터 값의 동일성
	
	private String parseBearerToken(HttpServletRequest request) {
	// => Http request 의 헤더를 파싱해 Bearer 토큰을 리턴한다.	
		
		String bearerToken = request.getHeader("Authorization");  
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}
} //class
