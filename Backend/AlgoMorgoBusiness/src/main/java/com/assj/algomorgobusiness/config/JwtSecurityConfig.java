package com.assj.algomorgobusiness.config;

import com.assj.algomorgobusiness.filter.JwtFilter;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private TokenConfig tokenConfig;

    public JwtSecurityConfig(TokenConfig tokenConfig){
        this.tokenConfig = tokenConfig;
    }

    @Override
    public void configure(HttpSecurity http) {
        JwtFilter customFilter = new JwtFilter(tokenConfig);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
