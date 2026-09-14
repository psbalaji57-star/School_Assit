package com.northstar.studentmanagement.repository;

import com.northstar.studentmanagement.entity.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {}