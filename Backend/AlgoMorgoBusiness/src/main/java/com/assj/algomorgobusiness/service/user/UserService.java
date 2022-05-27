package com.assj.algomorgobusiness.service.user;

import com.assj.algomorgobusiness.dto.UserDto;

import java.util.List;
import java.util.Map;

public interface UserService {

    boolean registUser(UserDto userDto);
    List<UserDto> fetchUser();//없어도 될 기능
    boolean updateUser(UserDto userDto);
    boolean updateUser(UserDto userDto, String password);//비밀번호도 변경할 때
    Map<String, Object> getUser(String userId);
    boolean duplicate(String userId);
    boolean duplicateNickName(String nickName);
    boolean deleteUser(String userId, String password);
    Map<String, String> login(String userId, String password);

}
