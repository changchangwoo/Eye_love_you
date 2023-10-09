package com.eyeloveyou.biz.user;

public interface UserEyeDAO {
	
	void setUserEyeData(UserEyeVO vo);

	UserEyeVO getUserEyeAllData(UserEyeVO vo);
	
	int getDataCount();
	
	float getAllUserTimeSum();
	
	float getAllUserBlinkSum();
	
	int getAllUserWarningSum();
	
	float getAllUserCycleSum();
	
	float getAllUserTimeAvg();
	
	float getAllUserBlinkAvg();
	
	float getAllUserWarningAvg();
	
	float getAllUserCycleAvg();
	
	int getUserRank(UserEyeVO vo);
	
	int getUserWarningCount(UserEyeVO vo);
}
