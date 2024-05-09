// package com.teamstatic.popkornback.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class WebMvcConfig implements WebMvcConfigurer {

//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**")
//                 .allowedOrigins("http://www.popkorn.co.kr")
//                 .allowedMethods("*") // 필요한 HTTP 메서드들만 허용
//                 .allowedHeaders("*") // 필요한 헤더들만 허용
//                 .maxAge(3600);
//     }
// }