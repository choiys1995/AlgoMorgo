package com.assj.algomorgobusiness.service.recommend;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class RecommendServiceImpl implements RecommendService {

    @Override
    public void recommendAfterSignup(String userId) {
        try {
            System.out.println(">>>1" + userId);
            connection(userId);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void connection(String userId) {

        try {
            URL url = new URL("http://j6c204.p.ssafy.io:8082/v1/recommendproblem/one/" + userId);
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            String temp = conn.getResponseMessage();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
