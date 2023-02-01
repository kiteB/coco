package com.service.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.service.gateway.tokens.JwtAuthenticationFilter;
import com.service.gateway.tokens.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final JwtTokenProvider jwtTokenProvider;

	/**
	 * ===== Spring Security 설정 관련 레퍼런스 링크 =====
	 *
	 * 1. CustomFilter를 이용한 인증 구현
	 * https://kimchanjung.github.io/programming/2020/07/02/spring-security-02/
	 *
	 * 2. 403 Forbidden이 뜰 때 설정
	 * https://ruzun88.github.io/spring/security/403-forbidden.html#config-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC-%E1%84%83%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5
	 *
	 * 3. REST Api 설정
	 * https://sybarits.github.io/2020/11/08/rest-api-security.html
	 */

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.httpBasic()
			.disable()
			.csrf()
			.disable()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeRequests()
			// .antMatchers("/swagger*/**", "/login", "/check/**", "/member/register", "/token", "/sendEmail", "/tempPassword")
			// .permitAll()
			.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
			.antMatchers("/member/info/**", "/member/rating", "/member/extract", "/logout")
			.authenticated()
			.anyRequest().permitAll()
			.and()
			.logout()
			.logoutUrl("/logout")
			.logoutSuccessUrl("/") // Front와 연동 성공시 로그아웃 이후 연결 페이지 합의 볼 것.
			.invalidateHttpSession(true)
			.and()
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
				UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
}
