package com.assj.algomorgobusiness.service.mission;

import com.assj.algomorgobusiness.dto.MissionDto;
import com.assj.algomorgobusiness.dto.MissionStatusDto;
import com.assj.algomorgobusiness.dto.ProblemDto;
import com.assj.algomorgobusiness.entity.Mission;
import com.assj.algomorgobusiness.entity.Problem;
import com.assj.algomorgobusiness.entity.User;
import com.assj.algomorgobusiness.repository.MissionRepository;
import com.assj.algomorgobusiness.repository.ProblemRepository;
import com.assj.algomorgobusiness.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class MissionServiceImpl implements MissionService{

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<MissionDto> getMission(String userId, int year, int month) {

        LocalDateTime start = LocalDateTime.now().withYear(year).withMonth(month).withDayOfMonth(1).withHour(0);
        start = start.minusDays(1);
        start = start.withHour(23).withMinute(59).withSecond(59).withNano(999999);
        User user = userRepository.findByUserId(userId).get();
        LocalDateTime finish = LocalDateTime.now().withYear(year).withMonth(month+1).withDayOfMonth(1);
        finish = finish.minusDays(1);
        return getMissionDtos(start, user, finish);

    }

    private List<MissionDto> getMissionDtos(LocalDateTime start, User user, LocalDateTime finish) {
        return missionRepository.findAllByUserAndCreateDateBetween(user, start, finish)
                .stream().map(mission -> {
                    MissionDto missionDto = new MissionDto();
                    missionDto.setCreateDate(mission.getCreateDate());
                    missionDto.setSuccessDate(mission.getSuccessDate());
                    log.info(missionDto.toString());
                    Problem problem = mission.getProblem();
                    ProblemDto problemDto = new ProblemDto(
                            problem.getProblemId(),
                            problem.getProblemNum(),
                            problem.getProblemName(),
                            problem.getProblemSolved(),
                            problem.getProblemSubmit(),
                            problem.getProblemAnswer(),
                            problem.getProblemAvg()
                    );
                    missionDto.setProblemDto(problemDto);
                    return missionDto;
                }).collect(Collectors.toList());
    }

    @Override
    public List<MissionDto> getMissionByWeek(String userId) {

        LocalDateTime now = LocalDateTime.now();
        //월 1 ~ 일 7
        int dayOfWeek = now.getDayOfWeek().getValue();
        if(dayOfWeek == 7)
            dayOfWeek = 0;
        //일 0 ~ 토 6
        User user = userRepository.findByUserId(userId).get();
        LocalDateTime start = now.minusDays(dayOfWeek);
        start = start.minusDays(1);
        start = start.withHour(23).withMinute(59).withSecond(59).withNano(999999);
        now = now.plusDays(1);

        return getMissionDtos(start, user, now);
    }

    @Override
    public MissionStatusDto getMission(String userId) {

        User user = userRepository.findByUserId(userId).get();

        List<Mission> successMissions = missionRepository.findAllByUserAndSuccessDateIsNotNullOrderByCreateDate(user);
        int successCnt = successMissions.size();
        int totalSuccess = 1;
        Mission start = successMissions.get(0);

        int maxSuccess = 0;
        int cnt=1;

        for(int i=1; i<successCnt; i++){
            Mission mission = successMissions.get(i);
            LocalDateTime pre = LocalDateTime.now().withYear(start.getSuccessDate().getYear()).withMonth(start.getSuccessDate().getMonthValue()).withDayOfMonth(start.getSuccessDate().getDayOfMonth()).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime now = LocalDateTime.now().withYear(mission.getSuccessDate().getYear()).withMonth(mission.getSuccessDate().getMonthValue()).withDayOfMonth(mission.getSuccessDate().getDayOfMonth()).withHour(0).withMinute(0).withSecond(0);

            if (ChronoUnit.DAYS.between(pre, now) < 1){
                start = mission;
                continue;
            }
            if (ChronoUnit.DAYS.between(pre, now) == 1){
                cnt++;
                totalSuccess++;
                start = mission;
                maxSuccess = Math.max(maxSuccess,cnt);
                continue;
            }
            cnt = 1;
            totalSuccess++;
            start = mission;
        }

        MissionStatusDto missionStatusDto = new MissionStatusDto().builder().
                successCnt(successCnt).
                maxSuccess(maxSuccess).
                totalSuccess(totalSuccess).build();

        return missionStatusDto;
    }

}
