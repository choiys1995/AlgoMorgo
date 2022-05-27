package com.assj.algomorgobusiness.controller;

import com.assj.algomorgobusiness.dto.MissionDto;
import com.assj.algomorgobusiness.dto.RedisDto;
import com.assj.algomorgobusiness.repository.RedisRepository;
import com.assj.algomorgobusiness.service.redis.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/redis")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RedisController {

    private final RedisService redisService;

    @PostMapping("/add")
    public RedisDto add(@RequestBody RedisDto redisDto){
        log.info("확인용", redisDto);

        return redisService.save(redisDto);
    }

    @GetMapping("/today/{userId}")
    public List<MissionDto> getUserMission(@PathVariable("userId") String userId) {

        return redisService.getUserMission(userId);
    }

    @GetMapping("/refresh/{userId}")
    public List<MissionDto> getRefreshMission(@PathVariable("userId") String userId) {

        return redisService.getRefreshMission(userId);
    }

}
