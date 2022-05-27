package com.assj.algomorgobusiness.exception;

public class BadRequest extends RuntimeException{
    public BadRequest() {
        super("잘못된 접근입니다.");
    }
}
