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
@Table(name = "user")
public class User {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @Column(name = "user_id", length = 20, unique = true)
    private String userId;

    @Column(name = "language", length = 10)
    private String Language;

    @Column(name = "nickname", nullable = false, length = 50)
    private String Nickname;

    @Column(name = "baekjoon_id", length = 50)
    private String baekjoonId;

    @Column(name = "password")
    private String Password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Mission> missions = new ArrayList<>();

}
