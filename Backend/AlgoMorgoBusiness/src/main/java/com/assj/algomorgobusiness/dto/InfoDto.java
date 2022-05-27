package com.assj.algomorgobusiness.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class InfoDto {
    private String createDate;

    private String successDate;

    private String problemId;

    private String selected;
}
