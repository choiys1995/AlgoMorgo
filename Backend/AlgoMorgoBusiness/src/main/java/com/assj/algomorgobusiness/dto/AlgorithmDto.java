package com.assj.algomorgobusiness.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmDto {
    private int cnt;//문제 풀이 개수
    private String algorithmKor;
    private String algorithmEng;
}
