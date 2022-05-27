package com.assj.algomorgo.repository;

import com.assj.algomorgo.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RenewalRepository extends JpaRepository<Log,Integer> {

    @Query(value = "SELECT baekjoon_id FROM user WHERE user_id = :userId", nativeQuery = true)
    String findBaekjoonId(@Param(value = "userId") String userId);

    @Query(value = "SELECT id FROM user WHERE user_id = :userId",nativeQuery = true)
    int findId(@Param(value = "userId") String userId);

}
