package com.assj.algomorgobusiness.exception;

public class BadBaekJoonId extends RuntimeException{
    public BadBaekJoonId() {
        super("서비스 불가능한 사용자입니다.");
    }
}
