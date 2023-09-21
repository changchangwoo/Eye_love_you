package com.eyeloveyou.biz;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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
	
	@PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public UserProVO login(@RequestBody UserProVO requestData){
        UserProVO user = userProDAO.getUserData(requestData);
        if (user != null) {
            return user;
        }
        else {
            return user;
        }
    }
	
	@PostMapping("/signup")
    @CrossOrigin(origins = "http://localhost:3000")
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
    		userProDAO.signUserData(requestData);
    		return "성공";
    	}
	}
	
	@PostMapping("/info")
    @CrossOrigin(origins = "http://localhost:3000")
    public JSONObject qwasd(@RequestBody UserProVO requestData) {
        UserEyeVO user = new UserEyeVO();
        user.setUserId(requestData.getUserId());;
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
        JSONObject obj = new JSONObject(myHashMap);
        return obj;
    }
	
	@PostMapping("/map")
    @CrossOrigin(origins = "http://localhost:3000")
    public JSONObject map(@RequestBody UserProVO requestData) {
        UserProVO vo = new UserProVO();
        vo.setUserId(requestData.getUserId());
        String userHA = userProDAO.getUserAddress(vo);
        String searchTag1 = userHA+" 안과";
        String searchTag2 = userHA+" 안경";
        HashMap<String, Object> myHashMap = new HashMap<>();
        myHashMap.put("userHA", userHA);
        myHashMap.put("searchTag1", searchTag1);
        myHashMap.put("searchTag2", searchTag2);
        JSONObject obj = new JSONObject(myHashMap);
        return obj;
    }
}
