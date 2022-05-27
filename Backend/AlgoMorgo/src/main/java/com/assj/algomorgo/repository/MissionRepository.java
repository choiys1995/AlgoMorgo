package com.assj.algomorgo.repository;

import com.assj.algomorgo.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MissionRepository extends JpaRepository<Mission,Integer> {

//    @Query(value = "SELECT * FROM mission WHERE id = :id AND success_date IS NULL",nativeQuery = true)
    List<Mission> findAllByMissionIdAndSuccessDateIsNull(@Param("id") int id);

//    @Modifying
//    @Transactional
//    @Query(value = "UPDATE mission SET success_date = :curTime WHERE mission_id = :missionId",nativeQuery = true)
//    int updateMission(@Param("missionId")long missionId, @Param("curTime") Timestamp curTime);
}
