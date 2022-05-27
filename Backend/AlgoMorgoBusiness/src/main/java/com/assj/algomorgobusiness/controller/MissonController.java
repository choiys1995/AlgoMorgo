package com.assj.algomorgobusiness.controller;

import com.assj.algomorgobusiness.dto.MissionDto;
import com.assj.algomorgobusiness.dto.MissionStatusDto;
import com.assj.algomorgobusiness.service.mission.MissionService;
import com.assj.algomorgobusiness.service.mission.MissionServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/v1/mission")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MissonController {

    @Autowired
    private MissionService missionService;

    @GetMapping("/{year}/{month}/{userId}")
    public ResponseEntity<List<MissionDto>> getMission(@PathVariable("userId") String userId, @PathVariable("year") int year, @PathVariable("month") int month){
        List<MissionDto> result = missionService.getMission(userId,year,month);
        //하루 단위를 필요로 하면 이걸로 요청하고
        //T를 기준으로 파싱하거나 정규표현식 아니면 java LocalDateTime -> js로 바꿀 수 있는 걸로
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/week/{userId}")
    public ResponseEntity<List<MissionDto>> getMissionByWeek(@PathVariable("userId") String userId){
        List<MissionDto> result = missionService.getMissionByWeek(userId);
        log.info(result.toString());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<MissionStatusDto> getMissionInfo(@PathVariable("userId") String userId){
        MissionStatusDto result = missionService.getMission(userId);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

}
