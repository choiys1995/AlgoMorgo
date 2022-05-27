package com.assj.algomorgo.repository;

import com.assj.algomorgo.dto.RedisDto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedisRepository extends CrudRepository<RedisDto, String> {

}
