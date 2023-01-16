package com.ssafy.coco.api.dto.response;

import java.time.LocalDateTime;

import com.ssafy.coco.data.Member;

import lombok.Getter;

@Getter
public class MemberResponseDto {

	private String id;
	private String name;
	private String email;
	private String role;
	private Integer rating;
	private LocalDateTime regTime;
	private LocalDateTime delFlag;

	public MemberResponseDto(Member entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.rating = entity.getRating();
		this.role = entity.getRole();
		this.regTime = entity.getRegTime();
		this.delFlag = entity.getDelFlag();
	}
}
