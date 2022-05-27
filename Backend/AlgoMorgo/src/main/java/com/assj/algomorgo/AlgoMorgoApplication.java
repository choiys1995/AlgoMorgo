package com.assj.algomorgo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AlgoMorgoApplication {

    public static void main(String[] args) {
        SpringApplication.run(AlgoMorgoApplication.class, args);
    }

}
