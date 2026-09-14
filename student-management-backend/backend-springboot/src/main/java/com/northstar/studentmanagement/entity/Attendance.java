package com.northstar.studentmanagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "attendance")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    private LocalDate date;
    private String status;
    private String method;
    private LocalTime checkIn;

    protected Attendance() {}

    public Attendance(Student student, LocalDate date, String status, String method, LocalTime checkIn) {
        this.student = student;
        this.date = date;
        this.status = status;
        this.method = method;
        this.checkIn = checkIn;
    }

    public Long getId() { return id; }
    public Student getStudent() { return student; }
    public LocalDate getDate() { return date; }
    public String getStatus() { return status; }
    public String getMethod() { return method; }
    public LocalTime getCheckIn() { return checkIn; }
}