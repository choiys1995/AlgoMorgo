package com.assj.algomorgobusiness.exception;

public class BadUserId extends RuntimeException{
    public BadUserId() {
        super("이미 사용중인 아이디입니다.");
    }
}
