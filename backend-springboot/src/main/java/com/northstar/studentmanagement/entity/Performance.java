package com.northstar.studentmanagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "performance")
public class Performance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    private String subject;
    private String term;
    private double score;
    private double maxScore;

    protected Performance() {}

    public Performance(Student student, String subject, String term, double score, double maxScore) {
        this.student = student;
        this.subject = subject;
        this.term = term;
        this.score = score;
        this.maxScore = maxScore;
    }

    public Long getId() { return id; }
    public Student getStudent() { return student; }
    public String getSubject() { return subject; }
    public String getTerm() { return term; }
    public double getScore() { return score; }
    public double getMaxScore() { return maxScore; }
}