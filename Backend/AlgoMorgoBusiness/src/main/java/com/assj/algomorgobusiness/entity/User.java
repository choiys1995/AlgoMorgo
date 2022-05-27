package com.assj.algomorgobusiness.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "user")
public class User {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id", length = 20, unique = true)
    private String userId;

    @Column(name = "language", length = 10)
    private String language;

    @Column(name = "nickname", nullable = false, unique = true, length = 50)
    private String nickName;

    @Column(name = "baekjoon_id", nullable = false, length = 50)
    private String baekjoonId;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Activate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Mission> missions = new ArrayList<>();

}
