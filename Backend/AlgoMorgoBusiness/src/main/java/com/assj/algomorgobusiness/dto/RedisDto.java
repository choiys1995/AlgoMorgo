package com.assj.algomorgobusiness.dto;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import java.util.ArrayList;
import java.util.List;

@RedisHash("userId")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RedisDto {
    @Id
    private String userId;

    private List<InfoDto> infoList = new ArrayList<>();

}
