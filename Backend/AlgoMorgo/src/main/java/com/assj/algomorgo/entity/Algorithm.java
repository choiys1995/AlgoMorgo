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
@Table(name = "algorithm")
public class Algorithm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "algorithm_id")
    private int algorithmId;

    @Column(name = "algorithm_kor")
    private String algorithmKor;

    @Column(name = "algorithm_eng")
    private String algorithmEng;

    @OneToMany(mappedBy = "algorithm", cascade = CascadeType.ALL)
    private List<Tag> tags = new ArrayList<>();
}
