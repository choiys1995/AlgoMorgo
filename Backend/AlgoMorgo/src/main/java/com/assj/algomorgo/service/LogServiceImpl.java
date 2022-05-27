package com.assj.algomorgo.service;

import com.assj.algomorgo.entity.BaekjoonUser;
import com.assj.algomorgo.entity.Log;
import com.assj.algomorgo.entity.Problem;
import com.assj.algomorgo.repository.BaekjoonUserRepository;
import com.assj.algomorgo.repository.LogRepository;
import com.assj.algomorgo.repository.ProblemRepository;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class LogServiceImpl implements LogService{

    @Autowired
    BaekjoonUserRepository baekjoonUserRepository;

    @Autowired
    LogRepository logRepository;

    @Autowired
    ProblemRepository problemRepository;

    @Override
    public void renewalUserDetail() {
        // 저장된 백준 유저를 BaekjoonUser Entity로 불러와 List로 저장
        List<BaekjoonUser> list = baekjoonUserRepository.findAll();

        int size = list.size();
        List<Log> logs = new ArrayList<>();
        try {
            for(int i=0; i<size; i++) {

                String userName = list.get(i).getUserName();
                int pageCnt;
                String obj;
                int[] solvedList;// 백준 아이디 하나당 api 호출

                obj = connection(userName, 1);

                JSONObject jobj = new JSONObject(obj); // json으로 변경 (역직렬화)
                JSONArray arr = jobj.getJSONArray("items");
                pageCnt = jobj.getInt("count")/100 + 1;

                // 문제번호를 solvedList 배열에 따로 입력
                solvedList = new int[arr.length()];
                for(int j=0; j<arr.length(); j++){
                    solvedList[j] = arr.getJSONObject(j).getInt("problemId");
                }

                // 현재 호출된 api에 해당하는 BaekjoonUser 엔터티 하나를 저장
                BaekjoonUser baekjoonUser = list.get(i);

                for(int j=0; j<solvedList.length; j++) {
                    // solvedList 배열에 있는 모든 문제를 번호로 찾아서 Problem Entity로 저장
                    Problem problem = problemRepository.findByProblemNum(solvedList[j]);

                    // 저장한 BaekjoonUser와 Problem을 이용하여 Log Entity를 생성하고 DB에 Insert
//                    logRepository.save(new Log(null, baekjoonUser, problem));
                    logs.add(new Log(null, baekjoonUser, problem));
                }

                if(pageCnt > 1) {
                    for(int page=2; page<=pageCnt; page++) {
                        obj = connection(userName, page);

                        jobj = new JSONObject(obj); // json으로 변경 (역직렬화)
                        arr = jobj.getJSONArray("items");

                        // 문제번호를 solvedList 배열에 따로 입력
                        solvedList = new int[arr.length()];
                        for (int j = 0; j < arr.length(); j++) {
                            solvedList[j] = arr.getJSONObject(j).getInt("problemId");
                        }

                        for (int j = 0; j < solvedList.length; j++) {
                            // solvedList 배열에 있는 모든 문제를 번호로 찾아서 Problem Entity로 저장
                            Problem problem = problemRepository.findByProblemNum(solvedList[j]);

                            // 저장한 BaekjoonUser와 Problem을 이용하여 Log Entity를 생성하고 DB에 Insert
//                            logRepository.save(new Log(null, baekjoonUser, problem));
                            logs.add(new Log(null, baekjoonUser, problem));

                            if(logs.size() >= 300) {
                                logRepository.saveAll(logs);
                                logs.clear();
                                Thread.sleep(12500);
                            }
                        }
                    }
                }


                Thread.sleep(10000);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        logRepository.saveAll(logs);

    }

    public String connection(String username, int page) {
        String result = null;

        try {
            URL url = new URL("https://solved.ac/api/v3/search/problem?query=solved_by%3A" + username + "&page=" + page);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("GET"); // http 메서드
//                conn.setRequestProperty("Content-Type", "application/json"); // header Content-Type 정보
//                conn.setDoOutput(true); // 서버로부터 받는 값이 있다면 true

            // 서버로부터 데이터 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            StringBuilder sb = new StringBuilder();
            String line;

            while ((line = br.readLine()) != null) { // 읽을 수 있을 때 까지 반복
                sb.append(line);
            }

            result = sb.toString();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }
}
