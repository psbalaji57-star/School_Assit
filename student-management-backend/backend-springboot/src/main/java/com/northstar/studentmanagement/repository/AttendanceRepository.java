package com.northstar.studentmanagement.repository;

import com.northstar.studentmanagement.entity.Attendance;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findAllByOrderByDateDescIdDesc();
    List<Attendance> findByDate(LocalDate date);
    List<Attendance> findByStudentId(Long studentId);
}