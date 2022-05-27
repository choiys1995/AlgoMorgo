package com.assj.algomorgobusiness.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProblemDto {
    private int problemId;
    private int problemNum;
    private String problemName;
    private int problemSolved;
    private Long problemSubmit;
    private String problemAnswer;
    private double problemAvg;
}
