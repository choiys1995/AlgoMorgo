package com.assj.algomorgobusiness.service.mission;

import com.assj.algomorgobusiness.dto.MissionDto;
import com.assj.algomorgobusiness.dto.MissionStatusDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface MissionService {

    List<MissionDto> getMission(String userId, int year, int month);

    List<MissionDto> getMissionByWeek(String userId);

    MissionStatusDto getMission(String userId);
}
