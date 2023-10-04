package com.eyeloveyou.biz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class SpringBootProjectEly0527Application {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootProjectEly0527Application.class, args);
	}

}
