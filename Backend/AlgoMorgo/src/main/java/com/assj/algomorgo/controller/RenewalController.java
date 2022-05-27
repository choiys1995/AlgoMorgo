package com.assj.algomorgo.controller;

import com.assj.algomorgo.service.RenewalServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/batch")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RenewalController {

    @Autowired
    private RenewalServiceImpl renewalService;

    @GetMapping("/renewal/{userId}")
    public ResponseEntity renewalLog(@PathVariable("userId") String userId) throws IOException, InterruptedException {
        if(renewalService.renewalLog(userId))
            return new ResponseEntity(HttpStatus.OK);
        return new ResponseEntity(HttpStatus.I_AM_A_TEAPOT);
    }

    @GetMapping("/all")
    public ResponseEntity test(){
        renewalService.redisToDataBase();
        return new ResponseEntity(HttpStatus.OK);
    }
}
