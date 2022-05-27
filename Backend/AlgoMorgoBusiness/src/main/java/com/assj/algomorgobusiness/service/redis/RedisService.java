package com.assj.algomorgobusiness.service.redis;

import com.assj.algomorgobusiness.dto.MissionDto;
import com.assj.algomorgobusiness.dto.RedisDto;

import java.util.List;

public interface RedisService {
    RedisDto save(RedisDto redisDto);
    List<MissionDto> getUserMission(String Id);
    List<MissionDto> getRefreshMission(String Id);

}
