package com.assj.algomorgo.repository;

import com.assj.algomorgo.entity.Problem;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Integer> {
    Problem findByProblemNum(int problemNum);

//    @Query(value = "select problemId, problemNum from Problem")
//    Map<Integer, Integer> findAllProblemIdProblemNum();
}
