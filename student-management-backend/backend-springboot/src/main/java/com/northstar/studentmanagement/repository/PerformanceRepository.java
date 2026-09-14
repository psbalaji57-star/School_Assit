package com.northstar.studentmanagement.repository;

import com.northstar.studentmanagement.entity.Performance;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformanceRepository extends JpaRepository<Performance, Long> {
    List<Performance> findAllByOrderByIdDesc();
    List<Performance> findByStudentId(Long studentId);
}