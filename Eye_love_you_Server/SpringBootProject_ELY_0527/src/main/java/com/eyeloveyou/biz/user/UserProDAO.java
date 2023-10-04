package com.eyeloveyou.biz.user;

import java.util.List;

public interface UserProDAO {
	UserProVO getUserData(UserProVO vo);
	
	String getUserPassword(UserProVO vo);
	
	List<UserProVO> getUserList();
	
	void signUserData(UserProVO vo);
	
	int idCheck(UserProVO vo);
}
