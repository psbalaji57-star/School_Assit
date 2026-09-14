package com.northstar.studentmanagement;

import com.northstar.studentmanagement.entity.Attendance;
import com.northstar.studentmanagement.entity.LeaveRequest;
import com.northstar.studentmanagement.entity.Performance;
import com.northstar.studentmanagement.entity.SchoolClass;
import com.northstar.studentmanagement.entity.Student;
import com.northstar.studentmanagement.repository.AttendanceRepository;
import com.northstar.studentmanagement.repository.LeaveRepository;
import com.northstar.studentmanagement.repository.PerformanceRepository;
import com.northstar.studentmanagement.repository.SchoolClassRepository;
import com.northstar.studentmanagement.repository.StudentRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class StudentManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(StudentManagementApplication.class, args);
    }

    @Bean
    CommandLineRunner seedDatabase(
            StudentRepository students,
            AttendanceRepository attendance,
            PerformanceRepository performance,
            LeaveRepository leaves,
            SchoolClassRepository classes) {
        return args -> {
            if (students.count() > 0) {
                return;
            }

            Student ava = students.save(new Student("STU-2024-001", "Ava", "Thompson",
                    LocalDate.of(2010, 4, 18), "Female", "ava.thompson@northstar.edu",
                    "+1 415 555 0192", "Grade 9 · A", LocalDate.of(2024, 9, 1), "Active"));
            Student marcus = students.save(new Student("STU-2024-002", "Marcus", "Chen",
                    LocalDate.of(2011, 1, 9), "Male", "marcus.chen@northstar.edu",
                    "+1 415 555 0136", "Grade 8 · B", LocalDate.of(2024, 9, 1), "Active"));
            Student priya = students.save(new Student("STU-2024-003", "Priya", "Nair",
                    LocalDate.of(2010, 7, 24), "Female", "priya.nair@northstar.edu",
                    "+1 415 555 0114", "Grade 9 · A", LocalDate.of(2024, 9, 1), "Active"));

            classes.save(new SchoolClass("Grade 9 · A", "Grade 9", "A", "Elena Rodriguez", "H-204", 30));
            classes.save(new SchoolClass("Grade 8 · B", "Grade 8", "B", "James Wilson", "H-108", 28));
            classes.save(new SchoolClass("Grade 7 · A", "Grade 7", "A", "Maya Patel", "H-102", 30));

            LocalDate today = LocalDate.now();
            attendance.save(new Attendance(ava, today, "Present", "RFID", LocalTime.of(8, 12)));
            attendance.save(new Attendance(marcus, today, "Late", "Manual", LocalTime.of(8, 41)));
            attendance.save(new Attendance(priya, today, "Present", "NFC", LocalTime.of(8, 5)));
            attendance.save(new Attendance(ava, LocalDate.of(2025, 2, 3), "Present", "RFID", LocalTime.of(8, 10)));
            attendance.save(new Attendance(marcus, LocalDate.of(2025, 2, 3), "Absent", "Manual", null));
            attendance.save(new Attendance(priya, LocalDate.of(2025, 2, 3), "Present", "NFC", LocalTime.of(8, 6)));

            performance.save(new Performance(ava, "Mathematics", "Spring 2025", 92, 100));
            performance.save(new Performance(ava, "Science", "Spring 2025", 88, 100));
            performance.save(new Performance(marcus, "Mathematics", "Spring 2025", 81, 100));
            performance.save(new Performance(priya, "English", "Spring 2025", 95, 100));

            leaves.save(new LeaveRequest(marcus, "Family commitment", LocalDate.of(2025, 2, 14),
                    LocalDate.of(2025, 2, 14), "Pending", LocalDate.of(2025, 2, 8)));
            leaves.save(new LeaveRequest(priya, "Medical appointment", LocalDate.of(2025, 2, 11),
                    LocalDate.of(2025, 2, 12), "Approved", LocalDate.of(2025, 2, 6)));
        };
    }
}