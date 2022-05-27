package com.assj.algomorgobusiness.service.problem;

import com.assj.algomorgobusiness.dto.ProblemDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemServiceImpl implements ProblemService{
    @Override
    public List<ProblemDto> fetchProblem() {
        return null;
    }

    @Override
    public ProblemDto getProblem(int problemId) {
        return null;
    }

    @Override
    public ProblemDto getProblemByNum(int problemNum) {
        return null;
    }

    @Override
    public List<ProblemDto> fetchProblemByClass(int algorithmId) {
        return null;
    }

    @Override
    public List<ProblemDto> fetchProblemBySolved(String type) {
        return null;
    }

    @Override
    public List<ProblemDto> fetchProblemByAvg(String type) {
        return null;
    }
}
