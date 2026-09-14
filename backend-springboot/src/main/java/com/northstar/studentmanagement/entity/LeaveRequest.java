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

@Entity
@Table(name = "leave_requests")
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    private String reason;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private LocalDate requestedOn;

    protected LeaveRequest() {}

    public LeaveRequest(Student student, String reason, LocalDate startDate, LocalDate endDate,
                        String status, LocalDate requestedOn) {
        this.student = student;
        this.reason = reason;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.requestedOn = requestedOn;
    }

    public Long getId() { return id; }
    public Student getStudent() { return student; }
    public String getReason() { return reason; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getEndDate() { return endDate; }
    public String getStatus() { return status; }
    public LocalDate getRequestedOn() { return requestedOn; }
    public void setStatus(String value) { status = value; }
}