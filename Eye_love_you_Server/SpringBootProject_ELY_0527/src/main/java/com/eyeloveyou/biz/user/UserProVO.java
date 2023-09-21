package com.eyeloveyou.biz.user;

import lombok.Data;

@Data
public class UserProVO {
	private String userId;
	private String password;
	private String name;
	private String email;
	private String homeAddress;
	private String adminCheck;
}