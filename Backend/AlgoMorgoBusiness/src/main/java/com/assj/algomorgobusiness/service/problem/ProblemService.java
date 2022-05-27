package com.assj.algomorgobusiness.service.problem;

import com.assj.algomorgobusiness.dto.ProblemDto;

import java.util.List;

public interface ProblemService {
    List<ProblemDto> fetchProblem();

    ProblemDto getProblem(int problemId);

    ProblemDto getProblemByNum(int problemNum);

    List<ProblemDto> fetchProblemByClass(int algorithmId);

    List<ProblemDto> fetchProblemBySolved(String type);

    List<ProblemDto> fetchProblemByAvg(String type);
}
