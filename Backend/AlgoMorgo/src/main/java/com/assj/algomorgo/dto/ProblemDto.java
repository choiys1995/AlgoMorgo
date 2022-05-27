package com.assj.algomorgo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProblemDto {
    private int problemId;
    private int problemNum;
    private String problemName;
    private int problemPoint;
    private int problemSolved;
    private Long problemSubmit;
    private String problemAnswer;
    private Double problemAvg;
}
