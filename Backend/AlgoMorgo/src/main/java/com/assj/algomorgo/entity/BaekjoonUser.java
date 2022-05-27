package com.assj.algomorgo.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "BaekjoonUser")
public class BaekjoonUser {

    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_tier")
    private String userTier;

    @OneToMany(mappedBy = "baekjoonUser", cascade = CascadeType.ALL)
    private List<Log> logs = new ArrayList<>();

}
