package com.eyeloveyou.biz.user;

import java.util.List;

public interface UserProDAO {
	List<UserProVO> getUserList();
	UserProVO getUserData(UserProVO vo);
	String getUserAddress(UserProVO vo);
	void signUserData(UserProVO vo);
}
