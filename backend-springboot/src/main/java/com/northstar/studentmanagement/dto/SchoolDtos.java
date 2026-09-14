package com.northstar.studentmanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public final class SchoolDtos {
    private SchoolDtos() {}

    public record HealthStatus(String status) {}

    public record StudentInput(
            @NotBlank String studentId,
            @NotBlank String firstName,
            @NotBlank String lastName,
            @NotNull LocalDate dateOfBirth,
            @NotBlank String gender,
            @Email @NotBlank String email,
            @NotBlank String phone,
            @NotBlank String className,
            @NotNull LocalDate enrollmentDate,
            String status) {}

    public record StudentUpdate(
            String firstName,
            String lastName,
            @Email String email,
            String phone,
            String className,
            String status) {}

    public record StudentResponse(
            Long id,
            String studentId,
            String firstName,
            String lastName,
            LocalDate dateOfBirth,
            String gender,
            String email,
            String phone,
            String className,
            LocalDate enrollmentDate,
            String status,
            double attendanceRate,
            double averageScore) {}

    public record AttendanceInput(
            @NotNull Long studentId,
            @NotNull LocalDate date,
            @NotBlank String status,
            String method,
            LocalTime checkIn) {}

    public record SensorAttendanceInput(
            @NotBlank String sensorId,
            @NotNull LocalDate date,
            String status) {}

    public record AttendanceResponse(
            Long id,
            Long studentId,
            String studentName,
            LocalDate date,
            String status,
            String method,
            LocalTime checkIn) {}

    public record PerformanceInput(
            @NotNull Long studentId,
            @NotBlank String subject,
            @NotBlank String term,
            @Min(0) double score,
            @Positive double maxScore) {}

    public record PerformanceResponse(
            Long id,
            Long studentId,
            String studentName,
            String subject,
            String term,
            double score,
            double maxScore,
            double percentage,
            String grade) {}

    public record LeaveInput(
            @NotNull Long studentId,
            @NotBlank String reason,
            @NotNull LocalDate startDate,
            @NotNull LocalDate endDate) {}

    public record LeaveUpdate(@NotBlank String status) {}

    public record LeaveResponse(
            Long id,
            Long studentId,
            String studentName,
            String reason,
            LocalDate startDate,
            LocalDate endDate,
            String status,
            LocalDate requestedOn) {}

    public record ClassInput(
            @NotBlank String name,
            @NotBlank String grade,
            @NotBlank String section,
            @NotBlank String teacher,
            @NotBlank String room,
            @Positive int capacity) {}

    public record ClassResponse(
            Long id,
            String name,
            String grade,
            String section,
            String teacher,
            String room,
            int studentsCount,
            int capacity) {}

    public record ClassCount(String name, int count) {}
    public record AttendanceTrend(String day, int present, int absent) {}
    public record Activity(Long id, String title, String description, String time, String kind) {}

    public record Dashboard(
            int totalStudents,
            int presentToday,
            int pendingLeaves,
            double averageScore,
            double attendanceRate,
            List<ClassCount> studentsByClass,
            List<AttendanceTrend> attendanceTrend,
            List<Activity> recentActivity) {}
}