package com.assj.algomorgo.controller;

import com.assj.algomorgo.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/batch")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LogController {

    @Autowired
    private LogService logService;

    @PostMapping("/user/detail")
    public ResponseEntity<?> renewalUserDetail() {
        logService.renewalUserDetail();



        return new ResponseEntity<>("Success insert userDetailData ", HttpStatus.OK);
    }

    @GetMapping("/hi")
    public ResponseEntity<?> getHelloWorld(){
        return new ResponseEntity<>("Hello World cicd test33", HttpStatus.OK);
    }

}
