package com.assj.algomorgo.repository;

import com.assj.algomorgo.entity.BaekjoonUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BaekjoonUserRepository extends JpaRepository<BaekjoonUser, Integer> {

    List<BaekjoonUser> findAll();

//    List<BaekjoonUser> findAllOrderByUserId();
}
