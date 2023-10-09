package com.eyeloveyou.biz;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eyeloveyou.biz.user.UserEyeDAO;
import com.eyeloveyou.biz.user.UserEyeVO;
import com.eyeloveyou.biz.user.UserProDAO;
import com.eyeloveyou.biz.user.UserProVO;

@RestController
public class UserController {

	@Autowired
    private UserProDAO userProDAO;
	@Autowired
	private UserEyeDAO userEyeDAO;
	
	private final PasswordEncoder encoder;

    @Autowired
    public UserController(PasswordEncoder encoder) {
        this.encoder = encoder;
    }
	
	@PostMapping("/login")
	@CrossOrigin(origins = "*")
    public UserProVO login(@RequestBody UserProVO requestData){
		if (encoder.matches(requestData.getPassword(), userProDAO.getUserPassword(requestData)))
		{
			UserProVO user = userProDAO.getUserData(requestData);
			return user;
		}
		else
		{
			return null;
		}
    }
	
	@PostMapping("/signup")
	@CrossOrigin(origins = "*")
	public String signup(@RequestBody UserProVO requestData) {
    	if (requestData.getUserId() == null || requestData.getUserId().isEmpty()) {
    		return "아이디 없음";
    	}
    	else if (requestData.getPassword() == null || requestData.getPassword().isEmpty()) {
    		return "비밀번호 없음";
    	}
    	else if (requestData.getName() == null || requestData.getName().isEmpty()) {
    		return "이름 없음";
    	}
    	else if (requestData.getEmail() == null || requestData.getEmail().isEmpty()) {
    		return "이메일 없음";
    	}
    	else if (requestData.getHomeAddress() == null || requestData.getHomeAddress().isEmpty()) {
    		return "주소 없음";
    	}
    	else {
    		String rawPW = requestData.getPassword();
    		String encPW = encoder.encode(rawPW);
    		requestData.setPassword(encPW);
    		userProDAO.signUserData(requestData);
    		return "성공";
    	}
	}
	
	@PostMapping("/signup/check")
	@CrossOrigin(origins = "*")
	public boolean idCheck(@RequestBody UserProVO requestData) {
		int isDuplicate = userProDAO.idCheck(requestData);
		if (isDuplicate > 0) {
    		return true;
    	} else {
            return false;
        }
	}
	
	@PostMapping("/save")
	@CrossOrigin(origins = "*")
	public boolean insertEyeData(@RequestBody UserEyeVO requestData) {
		if (requestData.getTotalOperatingTime() >= 0) {
			userEyeDAO.setUserEyeData(requestData);
			return true;
		}
		else {
			return false;
		}
	}
	
	@PostMapping("/info")
	@CrossOrigin(origins = "*")
    public JSONObject qwasd(@RequestBody UserProVO requestData) {
        UserEyeVO user = new UserEyeVO();
        user.setUserId(requestData.getUserId());
        HashMap<String, Object> myHashMap = new HashMap<>();
        user = userEyeDAO.getUserEyeAllData(user);
        myHashMap.put("userId", user.getUserId());
        myHashMap.put("userTot", user.getTotalOperatingTime());
        myHashMap.put("userTbts", user.getTotalBlinkTimes());
        myHashMap.put("userWc", user.getWarningCount());
        myHashMap.put("userBc", user.getBlinkCycle());
        myHashMap.put("count", userEyeDAO.getDataCount());
        myHashMap.put("timeAvg", userEyeDAO.getAllUserTimeAvg());
        myHashMap.put("blinkAvg", userEyeDAO.getAllUserBlinkAvg());
        myHashMap.put("warningAvg", userEyeDAO.getAllUserWarningAvg());
        myHashMap.put("cycleAvg", userEyeDAO.getAllUserCycleAvg());
        myHashMap.put("userRank", userEyeDAO.getUserRank(user));
        JSONObject obj = new JSONObject(myHashMap);
        return obj;
    }
	
	@PostMapping("/map")
    @CrossOrigin(origins = "*")
    public JSONObject map(@RequestBody UserProVO requestData) {
        UserProVO vo = new UserProVO();
        vo.setUserId(requestData.getUserId());
        // String userHA = userProDAO.getUserAddress(vo);
        // String searchTag1 = userHA+" 안과";
        // String searchTag2 = userHA+" 안경";
        HashMap<String, Object> myHashMap = new HashMap<>();
        // myHashMap.put("userHA", userHA);
        // myHashMap.put("searchTag1", searchTag1);
        // myHashMap.put("searchTag2", searchTag2);
        JSONObject obj = new JSONObject(myHashMap);
        return obj;
    }
}
