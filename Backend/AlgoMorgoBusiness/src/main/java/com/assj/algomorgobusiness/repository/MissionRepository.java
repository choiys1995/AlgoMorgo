package com.assj.algomorgobusiness.repository;

import com.assj.algomorgobusiness.entity.Mission;
import com.assj.algomorgobusiness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MissionRepository extends JpaRepository<Mission,Long> {

    List<Mission> findAllByUserAndCreateDateBetween(User user, @Param("createDate") LocalDateTime start, @Param("successDate") LocalDateTime now);

    List<Mission> findAllByUserAndSuccessDateIsNotNullOrderByCreateDate(User user);
//    @Query(value = "select * from test.mission where id =:id and create_date between date_add(now(), INTERVAL :minus DAY) and now()", nativeQuery = true)
//    List<Mission> findAllByUserUIdAndCreateDateBetween(@Param("id") int id, @Param("minus") int minus);

}
