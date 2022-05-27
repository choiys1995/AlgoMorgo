package com.assj.algomorgobusiness.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "미션 현황", description = "미션 상태를 나타내는 Dto")
public class MissionStatusDto {

    @ApiModelProperty("최대 미션 연속 수행일")
    private int maxSuccess;

    @ApiModelProperty("완료한 데일리 미션 수")
    private int successCnt;

    @ApiModelProperty("총 미션 수행일")
    private int totalSuccess;
}
