package com.assj.algomorgobusiness.repository;

import com.assj.algomorgobusiness.dto.RedisDto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RedisRepository extends CrudRepository<RedisDto, String> {

}
