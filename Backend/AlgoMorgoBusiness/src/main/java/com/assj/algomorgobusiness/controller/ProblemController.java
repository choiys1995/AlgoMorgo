package com.assj.algomorgobusiness.controller;

import com.assj.algomorgobusiness.dto.ProblemDto;
import com.assj.algomorgobusiness.service.problem.ProblemService;
import com.assj.algomorgobusiness.service.problem.ProblemServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/problem")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @GetMapping
    public ResponseEntity<List<ProblemDto>> fetchProblem(){
        List<ProblemDto> result = problemService.fetchProblem();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{problemId}")
    public ResponseEntity<ProblemDto> getProblem(@PathVariable("problemId") int problemId){
        ProblemDto result = problemService.getProblem(problemId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/search/{problemNum}")
    public ResponseEntity<ProblemDto> getProblemByNum(@PathVariable("problemNum") int problemNum){
        ProblemDto result = problemService.getProblemByNum(problemNum);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/algorithm/{algorithmId}")
    public ResponseEntity<List<ProblemDto>> fetchProblemByClass(@PathVariable("algorithmId") int algorithmId){
        List<ProblemDto> result = problemService.fetchProblemByClass(algorithmId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/solved/{type}")
    public ResponseEntity<List<ProblemDto>> fetchProblemBySolved(@PathVariable("type") String type){
        List<ProblemDto> result = problemService.fetchProblemBySolved(type);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/avg/{type}")
    public ResponseEntity<List<ProblemDto>> fetchProblemByAvg(@PathVariable("type") String type){
        List<ProblemDto> result = problemService.fetchProblemByAvg(type);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
