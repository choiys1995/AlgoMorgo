package com.assj.algomorgobusiness.repository;

import com.assj.algomorgobusiness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUserId(@Param("userId") String userId);
    Optional<User> findByNickName(@Param("nickName") String nickName);
    Optional<User> findByUserIdAndPassword(@Param("userId") String userId, @Param("password") String password);
}
