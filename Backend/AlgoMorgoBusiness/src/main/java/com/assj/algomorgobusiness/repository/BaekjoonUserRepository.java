package com.assj.algomorgobusiness.repository;

import com.assj.algomorgobusiness.entity.BaekjoonUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BaekjoonUserRepository extends JpaRepository<BaekjoonUser,Integer> {

    Optional<BaekjoonUser> findByUserName(@Param("userName") String userName);
}
