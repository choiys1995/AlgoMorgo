package com.assj.algomorgobusiness.controller;

import com.assj.algomorgobusiness.dto.UpdateRequestDto;
import com.assj.algomorgobusiness.dto.UserDto;
import com.assj.algomorgobusiness.exception.*;
import com.assj.algomorgobusiness.filter.JwtFilter;
import com.assj.algomorgobusiness.service.recommend.RecommendService;
import com.assj.algomorgobusiness.service.user.UserService;
import com.assj.algomorgobusiness.service.user.UserServiceImpl;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/v1/user")
@CrossOrigin(origins = "*", allowedHeaders = "*",exposedHeaders = JwtFilter.AUTHORIZATION_HEADER)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RecommendService recommendService;

    @Operation(summary = "signUp", description = "회원가입 API입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "signUp success"),
            @ApiResponse(code = 418, message = "baekjoonId Not Found"),
            @ApiResponse(code = 400, message = "duplicate userId"),
            @ApiResponse(code = 403, message = "duplicate nickName")
    })
    @PostMapping("/signup")
    public ResponseEntity registUser(@RequestBody UserDto userDto){

        try{
            if(userService.registUser(userDto)) {
                recommendService.recommendAfterSignup(userDto.getUserId());
                return new ResponseEntity(HttpStatus.OK);
            } else
                return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }catch (BadUserId e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }catch (BadNickName e){
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }catch (BadBaekJoonId e){
            return new ResponseEntity(HttpStatus.I_AM_A_TEAPOT);
        }


    }

    @GetMapping
    public ResponseEntity<List<UserDto>> fetchUser(){
        List<UserDto> result = userService.fetchUser();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "login", description = "로그인 API입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "login success header에서 토큰을 확인"),
            @ApiResponse(code = 400, message = "아이디 혹은 비밀번호가 맞지 않습니다."),
    })
    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto requestUserDto){

        String userId = requestUserDto.getUserId();
        String password = requestUserDto.getPassword();
        log.info(userId);
        log.info(password);
        Map<String, String> result = null;
        try {
          result = userService.login(userId, password);
        }catch (DeactivateUser e){
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        }
        if(result.size() == 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        HttpHeaders headers = new HttpHeaders();
        log.debug(result.get("jwt"));
        UserDto responseUserDto = new UserDto().builder().
                nickName(result.get("nickName")).
                baekjoonId(result.get("baekjoonId")).
                language(result.get("language")).build();
        headers.add(JwtFilter.AUTHORIZATION_HEADER,"Bearer "+  result.get("jwt"));
        return new ResponseEntity<>(responseUserDto, headers, HttpStatus.OK);
    }

    @Operation(summary = "update", description = "회원정보 수정 API입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원정보가 변경됨. JWT삭제 후 로그아웃 시켜주세요."),
            @ApiResponse(code = 400, message = "아이디 혹은 비밀번호가 맞지 않거나, 닉네임 중복체크가 안 됨"),
    })
    @PutMapping("/{userId}")
    public ResponseEntity updateUser(@PathVariable("userId") String userId, @RequestBody UpdateRequestDto updateRequestDto){
        String changePassword = updateRequestDto.getChangePassword();
        UserDto requestDto = updateRequestDto.getUserDto();
        try {

            if(changePassword == null){
                return userService.updateUser(requestDto) ? new ResponseEntity(HttpStatus.OK) : new ResponseEntity(HttpStatus.NOT_MODIFIED);
            }else{
                return userService.updateUser(requestDto, changePassword) ? new ResponseEntity(HttpStatus.OK) : new ResponseEntity(HttpStatus.NOT_MODIFIED);
            }
        }catch (BadNickName e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }catch (BadValidation e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") String userId, @RequestBody Map<String, String> map){
        String password = map.getOrDefault("password", null);
        if(userService.deleteUser(userId, password))
            return new ResponseEntity(HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Operation(summary = "사용자 알고리즘 기록", description = "사용자의 알고리즘 별 풀이 개수 API입니다. 노션을 확인해주세요..")
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String,Object>> getUser(@PathVariable("userId") String userId){
        Map<String, Object> result = userService.getUser(userId);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/duplicate/check/{userId}")
    public ResponseEntity duplicate(@PathVariable("userId") String userId){
        if(userService.duplicate(userId))
            return new ResponseEntity(HttpStatus.OK);
            //true일 때 사용가능한 아이디
        else
            return new ResponseEntity((HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @GetMapping("/duplicateNickName/check/{nickName}")
    public ResponseEntity duplicateNickName(@PathVariable("nickName") String nickName){
        if(userService.duplicateNickName(nickName))
            return new ResponseEntity(HttpStatus.OK);
            //true일 때 사용가능한 아이디
        else
            return new ResponseEntity((HttpStatus.BAD_REQUEST));
    }


}
