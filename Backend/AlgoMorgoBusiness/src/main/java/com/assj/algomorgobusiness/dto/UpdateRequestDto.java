package com.assj.algomorgobusiness.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "회원정보 수정", description = "비밀번호 변경에는 changePassword")
public class UpdateRequestDto {


    @ApiModelProperty("회원정보 수정에는 항상 있어야 하는 값")
    private String userId;

    @ApiModelProperty("회원정보 수정에서 변경한 값 그대로 변경")
    private String language;

    @ApiModelProperty("닉네임 중복 체크를 해야함.")
    private String nickName;

    @ApiModelProperty("회원정보 수정에는 항상 있어야 하는 값")
    private String password;

    @ApiModelProperty("비밀번호를 변경하지 않을 것이라면 null로 전송")
    private String changePassword;

    public UserDto getUserDto(){
        UserDto userDto = new UserDto().builder().
                userId(this.userId).
                nickName(this.nickName).
                language(this.language).
                password(this.password).build();
        return userDto;
    }
}
