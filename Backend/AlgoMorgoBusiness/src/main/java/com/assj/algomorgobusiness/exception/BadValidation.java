package com.assj.algomorgobusiness.exception;

public class BadValidation extends RuntimeException{
    public BadValidation() {
        super("입력값을 확인해주세요.");
    }
}
