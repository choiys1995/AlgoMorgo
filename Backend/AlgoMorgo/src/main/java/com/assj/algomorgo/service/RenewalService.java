package com.assj.algomorgo.service;

import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface RenewalService {
    public boolean renewalLog(String userId) throws IOException, InterruptedException;

    public boolean redisToDataBase();
}
