package com.eyeloveyou.biz.user;

public interface UserEyeDAO {
	
	void setUserEyeData(UserEyeVO vo);
	
	int dataCheck(UserEyeVO vo);

	UserEyeVO getUserEyeAllData(UserEyeVO vo);
	
	void updateUserData(UserEyeVO vo);
	
	int getDataCount();
	
	int getUserRank(UserEyeVO vo);
	
	float getUserBTpM(UserEyeVO vo);
	
	float getUserWCpM(UserEyeVO vo);
	
	float getAllBTpM();
	
	float getAllWCpM();
	
	float getAllUserTimeAvg();
	
	float getAllUserCycleAvg();
	
	float getBlinkRatio(UserEyeVO vo);
	
	float getWarningRatio(UserEyeVO vo);
}
