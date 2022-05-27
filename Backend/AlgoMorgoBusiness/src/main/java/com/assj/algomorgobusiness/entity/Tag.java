package com.assj.algomorgobusiness.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "tag")
public class Tag {

    @Id
    @Column(name = "tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tagId;

    @ManyToOne
    @JoinColumn(name = "algorithm_id")
    private Algorithm algorithm;

    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem problem;

}
