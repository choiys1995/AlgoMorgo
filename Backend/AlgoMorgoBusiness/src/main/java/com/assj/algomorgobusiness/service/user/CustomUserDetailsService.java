package com.assj.algomorgobusiness.service.user;

import com.assj.algomorgobusiness.entity.Status;
import com.assj.algomorgobusiness.entity.User;
import com.assj.algomorgobusiness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        return userRepository.findByUserId(userId)
                .map(user -> createUser(userId, user))
                .orElseThrow(() -> new UsernameNotFoundException(userId + "를 찾을 수 없습니다."));
    }

    private org.springframework.security.core.userdetails.User createUser(String userId, User user) {
        if(user.getStatus() != Status.Activate){
            throw new RuntimeException(userId + "-> 활동이 정지 된 상태의 사용자입니다.");
        }
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("user"));
        return new org.springframework.security.core.userdetails.User(user.getUserId(), user.getPassword(), grantedAuthorities);
    }
}
