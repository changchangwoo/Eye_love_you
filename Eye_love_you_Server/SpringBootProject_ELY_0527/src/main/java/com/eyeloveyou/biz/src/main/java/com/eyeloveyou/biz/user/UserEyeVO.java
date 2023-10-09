package com.eyeloveyou.biz.user;

import lombok.Data;

@Data
public class UserEyeVO {
    private String userId;
    private float totalOperatingTime;
    private float totalBlinkTimes;
    private int warningCount;
    private float blinkCycle;
}