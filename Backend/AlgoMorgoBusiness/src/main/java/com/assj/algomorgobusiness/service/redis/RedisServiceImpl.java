package com.assj.algomorgobusiness.service.redis;

import com.assj.algomorgobusiness.dto.MissionDto;
import com.assj.algomorgobusiness.dto.ProblemDto;
import com.assj.algomorgobusiness.dto.RedisDto;
import com.assj.algomorgobusiness.entity.Problem;
import com.assj.algomorgobusiness.entity.User;
import com.assj.algomorgobusiness.repository.ProblemRepository;
import com.assj.algomorgobusiness.repository.RedisRepository;
import com.assj.algomorgobusiness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService{

    private final RedisRepository redisRepository;
    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;

    @Override
    public RedisDto save(RedisDto redisDto) {
        return redisRepository.save(redisDto);

    }

    @Override
    public List<MissionDto> getUserMission(String Id) { // 주석 확인, yml

        // userId 받아서 pk Id 가져오기
        Optional<User> user = userRepository.findByUserId(Id);
        String userId = user.get().getId() + "";
        RedisDto redisDto = redisRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("뭐가 문제야!!!!!!!!!!!!!!!!!!!!!"));
        List<MissionDto> missionDtoList = new ArrayList<>();

        missionList(redisDto, missionDtoList);

        return missionDtoList;
    }

    @Override
    public List<MissionDto> getRefreshMission(String Id) {

        Optional<User> user = userRepository.findByUserId(Id);
        String userId = user.get().getId() + "";

        RedisDto redisDto = redisRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("뭐가 문제야!!!!!!!!!!!!!!!!!!!!!"));
        List<MissionDto> missionDtoList = new ArrayList<>();
        List<Integer> trueNum = new ArrayList<>();
        List<Integer> falseNum = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            if(redisDto.getInfoList().get(i).getSelected().equals("1")) {
                trueNum.add(i);
            }
            if(redisDto.getInfoList().get(i).getSelected().equals("0") && redisDto.getInfoList().get(i).getSuccessDate().equals("null")) {
                falseNum.add(i);
            }
        }

        Collections.shuffle(falseNum);

        int j = 0;

        for(int i = 0; i < 3; i++) {
            if(redisDto.getInfoList().get(trueNum.get(i)).getSuccessDate().equals("null")) {
                redisDto.getInfoList().get(trueNum.get(i)).setSelected("0");
                j++;
                redisRepository.save(redisDto);
            }
        }

        for(int i = 0; i < j; i++) {
            redisDto.getInfoList().get(falseNum.get(i)).setSelected("1");
            redisRepository.save(redisDto);
        }

        missionList(redisDto, missionDtoList);

        for(Integer num : falseNum) {
            log.info(String.valueOf(num));
        }

        return missionDtoList;
    }

    private void missionList(RedisDto redisDto, List<MissionDto> missionDtoList) {
        for(int i = 0; i < 10; i++) {
            if(redisDto.getInfoList().get(i).getSelected().equals("1")) {
                MissionDto missionDto = new MissionDto();
                Problem problem = problemRepository.findById(Integer.valueOf(redisDto.getInfoList().get(i).getProblemId())).get();
                StringTokenizer st = new StringTokenizer(redisDto.getInfoList().get(i).getCreateDate(), "-");
                missionDto.setCreateDate(LocalDateTime.now().withYear(Integer.parseInt(st.nextToken())).withMonth(Integer.parseInt(st.nextToken())).withDayOfMonth(Integer.parseInt(st.nextToken())));
                if(!redisDto.getInfoList().get(i).getSuccessDate().equals("null")){
                    StringTokenizer str = new StringTokenizer(redisDto.getInfoList().get(i).getSuccessDate(), "-");
                    missionDto.setSuccessDate(LocalDateTime.now().withYear(Integer.parseInt(str.nextToken())).withMonth(Integer.parseInt(str.nextToken())).withDayOfMonth(Integer.parseInt(str.nextToken())));
                }

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
                missionDtoList.add(missionDto);

            }
        }
    }

}
