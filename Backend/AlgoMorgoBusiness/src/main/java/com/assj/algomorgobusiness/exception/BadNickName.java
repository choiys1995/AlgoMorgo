package com.assj.algomorgobusiness.exception;

public class BadNickName extends RuntimeException{
    public BadNickName() {
        super("이미 사용중인 닉네임입니다.");
    }
}
