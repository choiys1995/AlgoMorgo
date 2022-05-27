package com.assj.algomorgo.dto;

import lombok.Data;

import java.util.List;

@Data
public class TagDto {

    private int tagId;

    private int problemId;

    private List<AlgorithmDto> algorithmDtoList;

}
