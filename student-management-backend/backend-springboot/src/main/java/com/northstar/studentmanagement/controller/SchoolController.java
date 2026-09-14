package com.northstar.studentmanagement.controller;

import com.northstar.studentmanagement.dto.SchoolDtos;
import com.northstar.studentmanagement.service.SchoolService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SchoolController {
    private final SchoolService school;

    public SchoolController(SchoolService school) {
        this.school = school;
    }

    @GetMapping("/healthz")
    public SchoolDtos.HealthStatus health() {
        return new SchoolDtos.HealthStatus("ok");
    }

    @GetMapping("/dashboard")
    public SchoolDtos.Dashboard dashboard() {
        return school.dashboard();
    }

    @GetMapping("/students")
    public List<SchoolDtos.StudentResponse> students(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status) {
        return school.listStudents(search, status);
    }

    @PostMapping("/students")
    public ResponseEntity<SchoolDtos.StudentResponse> createStudent(
            @Valid @RequestBody SchoolDtos.StudentInput input) {
        return ResponseEntity.status(HttpStatus.CREATED).body(school.createStudent(input));
    }

    @GetMapping("/students/{id}")
    public SchoolDtos.StudentResponse student(@PathVariable Long id) {
        return school.getStudent(id);
    }

    @PatchMapping("/students/{id}")
    public SchoolDtos.StudentResponse updateStudent(
            @PathVariable Long id, @Valid @RequestBody SchoolDtos.StudentUpdate input) {
        return school.updateStudent(id, input);
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        school.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/attendance")
    public List<SchoolDtos.AttendanceResponse> attendance(
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String status) {
        return school.listAttendance(date, status);
    }

    @PostMapping("/attendance")
    public ResponseEntity<SchoolDtos.AttendanceResponse> createAttendance(
            @Valid @RequestBody SchoolDtos.AttendanceInput input) {
        return ResponseEntity.status(HttpStatus.CREATED).body(school.createAttendance(input));
    }

    @PostMapping("/attendance/sensor")
    public ResponseEntity<SchoolDtos.AttendanceResponse> sensorAttendance(
            @Valid @RequestBody SchoolDtos.SensorAttendanceInput input) {
        return ResponseEntity.status(HttpStatus.CREATED).body(school.createSensorAttendance(input));
    }

    @GetMapping("/performance")
    public List<SchoolDtos.PerformanceResponse> performance(
            @RequestParam(required = false) String term) {
        return school.listPerformance(term);
    }

    @PostMapping("/performance")
    public ResponseEntity<SchoolDtos.PerformanceResponse> createPerformance(
            @Valid @RequestBody SchoolDtos.PerformanceInput input) {
        return ResponseEntity.status(HttpStatus.CREATED).body(school.createPerformance(input));
    }

    @GetMapping("/leaves")
    public List<SchoolDtos.LeaveResponse> leaves(
            @RequestParam(required = false) String status) {
        return school.listLeaves(status);
    }

    @PostMapping("/leaves")
    public ResponseEntity<SchoolDtos.LeaveResponse> createLeave(
            @Valid @RequestBody SchoolDtos.LeaveInput input) {
        return ResponseEntity.status(HttpStatus.CREATED).body(school.createLeave(input));
    }

    @PatchMapping("/leaves/{id}")
    public SchoolDtos.LeaveResponse updateLeave(
            @PathVariable Long id, @Valid @RequestBody SchoolDtos.LeaveUpdate input) {
        return school.updateLeave(id, input);
    }

    @GetMapping("/classes")
    public List<SchoolDtos.ClassResponse> classes() {
        return school.listClasses();
    }

    @PostMapping("/classes")
    public ResponseEntity<SchoolDtos.ClassResponse> createClass(
            @Valid @RequestBody SchoolDtos.ClassInput input) {
        return ResponseEntity.status(HttpStatus.CREATED).body(school.createClass(input));
    }
}