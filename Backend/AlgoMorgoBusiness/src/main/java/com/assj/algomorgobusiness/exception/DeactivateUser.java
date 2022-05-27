package com.assj.algomorgobusiness.exception;

public class DeactivateUser extends RuntimeException{

    public DeactivateUser() {
        super("탈퇴한 사용자입니다.");
    }
}
