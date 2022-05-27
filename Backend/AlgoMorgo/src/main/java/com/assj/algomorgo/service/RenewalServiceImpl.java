package com.assj.algomorgo.service;

import com.assj.algomorgo.dto.InfoDto;
import com.assj.algomorgo.dto.RedisDto;
import com.assj.algomorgo.entity.Mission;
import com.assj.algomorgo.entity.Problem;
import com.assj.algomorgo.entity.User;
import com.assj.algomorgo.repository.*;
import io.swagger.models.auth.In;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RenewalServiceImpl implements RenewalService{

    @Autowired
    RedisRepository redisRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProblemRepository problemRepository;

    @Autowired
    MissionRepository missionRepo;

    @Override
    public boolean renewalLog(String id) throws IOException, InterruptedException {
        //id 이용해서 baekjoonId 가져오기
//        String baekjoonId = renewalRepo.findBaekjoonId(id);
//
//        int id = renewalRepo.findId(id);
        User user = userRepository.findByUserId(id).get();
        int[] solvedList = null;
        String baekjoonId = user.getBaekjoonId();
        String userId = user.getId()+"";
        //baekjoonId,solved api 이용해서 유저가 푼 문제 목록 가져오기
        try {
            URL url = new URL("https://solved.ac/api/v3/search/problem?query=solved_by%3A"+baekjoonId);
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();

            conn.setRequestMethod("GET"); // http 메서드
            conn.setRequestProperty("Content-Type", "application/json"); // header Content-Type 정보
            conn.setDoOutput(true); // 서버로부터 받는 값이 있다면 true

            // 서버로부터 데이터 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line = null;

            while((line = br.readLine()) != null) { // 읽을 수 있을 때 까지 반복
                sb.append(line);
            }
            JSONObject obj = new JSONObject(sb.toString()); // json으로 변경 (역직렬화)
            JSONArray arr = obj.getJSONArray("items");
            solvedList = new int[arr.length()];
            for(int i=0; i<arr.length(); i++){
                solvedList[i] = arr.getJSONObject(i).getInt("problemId");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        //id 이용해서 Misson 목록 중 success_date가 null인 리스트 가져오기
//        List<Mission> unsolvedMissons = missionRepo.findAllByMissionIdAndSuccessDateIsNull(id);
        RedisDto redisDto = redisRepository.findById(userId).orElseThrow(() -> new RuntimeException("뭐가 문제야!!!!!!!!!!!!!!!!!!!!!"));
        System.out.println(userId);
        System.out.println(redisDto.toString());

        List<InfoDto> todayMissions = redisDto.getInfoList();
        List<InfoDto> selectedMissions = new ArrayList<>();
        todayMissions.forEach(infoDto -> {
            if(infoDto.getSelected().equals("1"))
                selectedMissions.add(infoDto);
        });
        Map<Integer, Integer> problemMap = new HashMap<>();
        problemRepository.findAll().stream().forEach(problem -> {
            problemMap.put(problem.getProblemId(), problem.getProblemNum());
        });
        //unsolvedMissons와 solvedList를 비교하며 클리어한 미션이 있는지 확인
        for(int i=0; i< todayMissions.size(); i++){
            for(int j=0; j< solvedList.length; j++){
                if(problemMap.get(Integer.parseInt(todayMissions.get(i).getProblemId())) == solvedList[j]){

                    LocalDate successDate = LocalDate.now();
                    todayMissions.get(i).setSuccessDate(successDate.toString());
                }
            }
        }
        redisDto.setInfoList(todayMissions);
        redisRepository.save(redisDto);

        return true;
    }

    @Override
    public boolean redisToDataBase() {

        userRepository.findAll().forEach(user -> {
            try {
                renewalLog(user.getUserId());
            } catch (IOException e) {
                e.printStackTrace();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        userRepository.findAll().forEach(user -> {
            redisRepository.findById(user.getId()+"").orElseThrow(()->new RuntimeException("redis에 값이 없음")).getInfoList().forEach(infoDto -> {
                if(infoDto.getSelected().equals("1")){
                    Mission mission = new Mission();
                    mission.setUser(user);
                    mission.setProblem(problemRepository.findById(Integer.parseInt(infoDto.getProblemId())).get());

                    StringTokenizer st = new StringTokenizer(infoDto.getCreateDate(),"-");
                    mission.setCreateDate(LocalDateTime.now().
                            withYear(Integer.parseInt(st.nextToken())).
                            withMonth(Integer.parseInt(st.nextToken())).
                            withDayOfMonth(Integer.parseInt(st.nextToken())).
                            withHour(0).withMinute(0).withSecond(0));
                    if(infoDto.getSuccessDate().equals("null") || infoDto.getSuccessDate().equals(null))
                        mission.setSuccessDate(null);
                    else {
                        st = new StringTokenizer(infoDto.getSuccessDate(), "-");
                        mission.setSuccessDate(LocalDateTime.now().
                                withYear(Integer.parseInt(st.nextToken())).
                                withMonth(Integer.parseInt(st.nextToken())).
                                withDayOfMonth(Integer.parseInt(st.nextToken())).
                                withHour(0).withMinute(0).withSecond(0));
                    }
                    missionRepo.save(mission);
                }

            });
        });


        return false;
    }


}
