package com.northstar.studentmanagement.repository;

import com.northstar.studentmanagement.entity.LeaveRequest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findAllByOrderByRequestedOnDesc();
}