package com.assj.algomorgobusiness.repository;

import com.assj.algomorgobusiness.entity.Algorithm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlgorithmRepository extends JpaRepository<Algorithm,Integer> {
}
