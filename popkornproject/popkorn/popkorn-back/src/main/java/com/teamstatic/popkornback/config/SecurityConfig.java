package com.teamstatic.popkornback.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.teamstatic.popkornback.jwtToken.JwtAuthenticationFilter;

//** Spring_Boot Security
// => 로그인 : Authentication(인증)
// => API 사용권한 부여 : Authirization(인가)

//** Spring_Boot Security 인증 설정화일
//=> React Project 사용시 인증 설정에 사용됨
//=> React Project의 API 서버는 Ajax로 호출되기 때문에
//	 기존의 페이지 요청과는 다른점이 있고 이를위한 설정이 필요함.
//	-> CORS 설정
//	-> 스프링 시큐리티는 Get방식 이외의 호출시에는
//	   CSRF공격 방어를 위한 설정이 기본으로 활성화되어있으므로 이에대한 변경 필요함 
//	-> 아래 filterChain() 메서드 참고

//** SpringBoot Auto Configuration
//=> SpringBoot가 자동으로 설정해줌을 의미하며 이를 지원해주는 다양한 @ 들이 있음.

//** @EnableWebSecurity
//=> SpringBoot Auto Configuration @들 중의 하나이며, 손쉽게 Security 설정을 할수있도록해줌.
// 	 그러므로 설정파일을 의미하는 @Configuration 은 없어도 됨

@EnableWebSecurity
// @EnableMethodSecurity
// => 컨트롤러에 메서드 단위로 인가를 허용하는 @PreAuthorize 를 적용하기위해 필요함.
// ( 아래 122행 주석문 "메서드 단위로 Authirization(인가)" 참고 )
public class SecurityConfig {

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	// ** HttpSecurity
	// => 시큐리티 설정을 위한 오브젝트
	// => 빌더를 이용해서 cors, csrf, httpBasic, session, authorizeRequests 등
	// 다양한 시큐리티관련 설정을 할 수있다.

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		// ** Filter 등록
		// => http.addFilterBefore( NewFilter(), BasicAuthenticationFilter.class )
		// : BasicAuthenticationFilter 의 Pre Filter 로 등록
		// => http.addFilterAfter(NewFilter(), BasicAuthenticationFilter.class )
		// : BasicAuthenticationFilter 의 Post Filter 로 등록

		// ** jwtAuthenticationFilter 를 Security filter 에 등록
		// => 아래 68행~ return 구문의 cors() 호출 위치를 보면,
		// 스프링 시큐리티의 Authentication Filter 인증보다 앞서 CorsFilter 검증이 일어나고,
		// 이어서 jwtAuthenticationFilter 가 실행되도록 설정.
		// => 즉, 매 request 마다 CorsFilter 실행후 jwtAuthenticationFilter 실행하도록 설정.
		// 이 순서가 필수는 아니지만 적절하기때문에 이렇게 설정함.
		http.addFilterAfter(
				jwtAuthenticationFilter,
				UsernamePasswordAuthenticationFilter.class);

		// ** http 시큐리티 빌더
		// => disable(): 사용 안함 설정
		// => and() : 체이닝 방식을 사용하여 진행 할 때 사용
		// => csrf(): csrf보호 활성화 호출 후 enable, disable로 설정
		// => cors(): CorsFilter 추가,
		// WebMvcConfig.java 의 addCorsMappings(CorsRegistry registry) 메서드 대신
		// CorsFilter 의 속성값을 직접 정의할수 있으며,
		// 이때는 CorsConfigurationSource 로 정의함.
		// ( 코드로배우는리액트 ch7 CustomSecurityConfig.java 참고 )

		// => sessionManagement: 한번에 단일 사용자 인스턴스만 인증되도록 하는 방법
		// => sessionCreationPolicy: 세션 정책
		// .ALWAYS: 항상 세션을 생성
		// .IF_REQUIRED: 필요시 생성(기본)
		// .NEVER: 생성하지 않지만 기존 존재시 사용
		// .STATELESS: 생성하지도 않고, 존재해도 사용하지않음 (JWT 토큰방식을 이용할 경우 사용)
		// => authorizeRequests(): RequestMatcher를 기반으로 엑세스 제한 기능
		// => antMatcher: 제시한 ant 패턴과 일치할때만 호출 가능
		// => anyRequest ~ authenticated : 어떠한 요청도 인가받아야함.

		return http.httpBasic().disable() // token을 사용하므로 basic 인증 disable (사용안함)
				.formLogin().disable() // 인증 적용전
				.logout().disable()

				// => 스프링시큐리티 의 LoginFilter 를 사용하여 인증.인가 적용하는경우 사용
				// -> Request_Parameter_Name은 반드시 username 과 password 임
				// ( 다르면 스프링시큐리티가 인식못함. )
				// -> 스프링시큐리티가 요구하는 형식으로 작성된 아래의 화일이 필요함.
				// securityLogin 폴더의
				// CustomUserDetailsService, LoginFailHandler, onAuthenticationSuccess
				// -> login/logout 을 처리하는 컨트롤러의 메서드는 필요치 않음.
				// .formLogin(config -> {
				// config.loginPage("/user/login");
				// config.successHandler(new LoginSuccessHandler());
				// config.failureHandler(new LoginFailHandler()); })
				// .logout()
				// .logoutUrl("/auth/logout")
				// .deleteCookies("JSESSIONID").and()

				.csrf().disable() // csrf는 API 서버 현재 사용하지 않으므로 disable
				.cors().configurationSource(request -> {
					CorsConfiguration config = new CorsConfiguration();
					config.setAllowedOrigins(Arrays.asList("http://localhost:3000/"));
					config.setAllowedMethods(Arrays.asList("*"));
					config.setAllowCredentials(true);
					config.setAllowedHeaders(Arrays.asList("*"));
					config.setMaxAge(3600L);
					return config;
				}).and()
				// .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				// => session 기반이 아님을 선언

				.authorizeRequests()

				// => Role 적용이후 Authirization(인가)
				.antMatchers("/api/admin/**").hasRole("ADMIN")
				.antMatchers("/api/manager/**").hasRole("MANAGER")
				.antMatchers("/api/member/**").hasRole("USER")
				.antMatchers("/api/**").permitAll()
				.anyRequest().permitAll().and()

				// ** 메서드 단위로 Authirization(인가)
				// => @PreAuthorize("hasAnyRole("ROLE_USER","ROLE_MANAGER")")
				// 인가된 권한에 대한 설정을 컨트롤러의 메서드 단위로 적용가능함
				// 단, 이를 위해서는 시큐리티설정 클래스(SecurityConfig.java)에
				// @EnableMethodSecurity 필요함.

				// => Role 적용이전 Authirization(인가)
				// .antMatchers("/", "/home", "/user/**", "/member/**", "/board/**",
				// "/resources/**", "/uploadImage/**").permitAll()
				// => "/", "/home", "/resources/**", "/uploadImage/**", "/member/**" 등의 경로는 인증
				// 안해도 됨.
				// .anyRequest().authenticated().and()
				// => 위 이외의 모든 경로는 인증해야됨.

				.build();
	} // filterChain

} // class
