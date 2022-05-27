package com.assj.algomorgo.scheduler;

import com.assj.algomorgo.repository.RedisRepository;
import com.assj.algomorgo.service.RenewalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class RedisToDataBase {

    @Autowired
    private RenewalService renewalService;

    @Autowired
    private RedisRepository redisRepository;

    @Scheduled(cron = "59 29 23 * * *", zone = "Asia/Seoul")
    public void saveMission(){
        renewalService.redisToDataBase();

    }

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void updateMission(){
        redisRepository.deleteAll();

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity entity = new HttpEntity("parameters",headers);
        String url = "http://j6c204.p.ssafy.io:8082/v1/recommendproblem/all";
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        if(response.getStatusCode() != HttpStatus.OK)
            log.info("추천서버에 문제가 생겼습니다.");
    }

}
