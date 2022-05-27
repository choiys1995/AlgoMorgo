package com.assj.algomorgo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.ArrayList;
import java.util.List;

@RedisHash("userId")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RedisDto {
    private List<InfoDto> infoList = new ArrayList<>();

    @Id
    private String userId;

}
