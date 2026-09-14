package com.northstar.studentmanagement.service;

import com.northstar.studentmanagement.dto.SchoolDtos;
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
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class SchoolService {
    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm");
    private final StudentRepository students;
    private final AttendanceRepository attendance;
    private final PerformanceRepository performance;
    private final LeaveRepository leaves;
    private final SchoolClassRepository classes;

    public SchoolService(StudentRepository students, AttendanceRepository attendance,
                         PerformanceRepository performance, LeaveRepository leaves,
                         SchoolClassRepository classes) {
        this.students = students;
        this.attendance = attendance;
        this.performance = performance;
        this.leaves = leaves;
        this.classes = classes;
    }

    public List<SchoolDtos.StudentResponse> listStudents(String search, String status) {
        String query = search == null ? "" : search.trim().toLowerCase();
        return students.findAll(SortHelper.byLastName()).stream()
                .filter(student -> status == null || status.equals(student.getStatus()))
                .filter(student -> query.isBlank() || (student.getFirstName() + " " + student.getLastName() + " "
                        + student.getStudentId() + " " + student.getEmail()).toLowerCase().contains(query))
                .map(this::studentResponse)
                .toList();
    }

    public SchoolDtos.StudentResponse createStudent(SchoolDtos.StudentInput input) {
        Student student = new Student(input.studentId(), input.firstName(), input.lastName(),
                input.dateOfBirth(), input.gender(), input.email(), input.phone(), input.className(),
                input.enrollmentDate(), input.status() == null ? "Active" : input.status());
        return studentResponse(students.save(student));
    }

    public SchoolDtos.StudentResponse getStudent(Long id) {
        return studentResponse(requireStudent(id));
    }

    public SchoolDtos.StudentResponse updateStudent(Long id, SchoolDtos.StudentUpdate input) {
        Student student = requireStudent(id);
        if (input.firstName() != null) student.setFirstName(input.firstName());
        if (input.lastName() != null) student.setLastName(input.lastName());
        if (input.email() != null) student.setEmail(input.email());
        if (input.phone() != null) student.setPhone(input.phone());
        if (input.className() != null) student.setClassName(input.className());
        if (input.status() != null) student.setStatus(input.status());
        return studentResponse(student);
    }

    public void deleteStudent(Long id) {
        students.delete(requireStudent(id));
    }

    public List<SchoolDtos.AttendanceResponse> listAttendance(String date, String status) {
        return attendance.findAllByOrderByDateDescIdDesc().stream()
                .filter(item -> date == null || item.getDate().toString().equals(date))
                .filter(item -> status == null || status.equals(item.getStatus()))
                .map(this::attendanceResponse)
                .toList();
    }

    public SchoolDtos.AttendanceResponse createAttendance(SchoolDtos.AttendanceInput input) {
        Attendance record = new Attendance(requireStudent(input.studentId()), input.date(),
                input.status(), input.method() == null ? "Manual" : input.method(), input.checkIn());
        return attendanceResponse(attendance.save(record));
    }

    public SchoolDtos.AttendanceResponse createSensorAttendance(SchoolDtos.SensorAttendanceInput input) {
        Student student = students.findByStudentId(input.sensorId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No student matches this sensor ID"));
        Attendance record = new Attendance(student, input.date(), input.status() == null ? "Present" : input.status(),
                "RFID / NFC", LocalTime.now());
        return attendanceResponse(attendance.save(record));
    }

    public List<SchoolDtos.PerformanceResponse> listPerformance(String term) {
        return performance.findAllByOrderByIdDesc().stream()
                .filter(item -> term == null || term.equals(item.getTerm()))
                .map(this::performanceResponse)
                .toList();
    }

    public SchoolDtos.PerformanceResponse createPerformance(SchoolDtos.PerformanceInput input) {
        Performance record = new Performance(requireStudent(input.studentId()), input.subject(), input.term(),
                input.score(), input.maxScore());
        return performanceResponse(performance.save(record));
    }

    public List<SchoolDtos.LeaveResponse> listLeaves(String status) {
        return leaves.findAllByOrderByRequestedOnDesc().stream()
                .filter(item -> status == null || status.equals(item.getStatus()))
                .map(this::leaveResponse)
                .toList();
    }

    public SchoolDtos.LeaveResponse createLeave(SchoolDtos.LeaveInput input) {
        LeaveRequest record = new LeaveRequest(requireStudent(input.studentId()), input.reason(),
                input.startDate(), input.endDate(), "Pending", LocalDate.now());
        return leaveResponse(leaves.save(record));
    }

    public SchoolDtos.LeaveResponse updateLeave(Long id, SchoolDtos.LeaveUpdate input) {
        LeaveRequest leave = leaves.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Leave request not found"));
        leave.setStatus(input.status());
        return leaveResponse(leave);
    }

    public List<SchoolDtos.ClassResponse> listClasses() {
        Map<String, Long> counts = students.findAll().stream()
                .collect(Collectors.groupingBy(Student::getClassName, Collectors.counting()));
        return classes.findAll().stream()
                .map(item -> classResponse(item, counts.getOrDefault(item.getName(), 0L).intValue()))
                .toList();
    }

    public SchoolDtos.ClassResponse createClass(SchoolDtos.ClassInput input) {
        return classResponse(classes.save(new SchoolClass(input.name(), input.grade(), input.section(),
                input.teacher(), input.room(), input.capacity())), 0);
    }

    public SchoolDtos.Dashboard dashboard() {
        List<Student> allStudents = students.findAll();
        List<Attendance> allAttendance = attendance.findAllByOrderByDateDescIdDesc();
        List<Performance> allPerformance = performance.findAllByOrderByIdDesc();
        List<LeaveRequest> allLeaves = leaves.findAllByOrderByRequestedOnDesc();
        LocalDate today = LocalDate.now();

        int presentToday = (int) allAttendance.stream()
                .filter(item -> today.equals(item.getDate()))
                .filter(item -> item.getStatus().equals("Present") || item.getStatus().equals("Late"))
                .count();
        double averageScore = allPerformance.isEmpty() ? 0 : allPerformance.stream()
                .mapToDouble(item -> item.getScore() / item.getMaxScore() * 100).average().orElse(0);
        long present = allAttendance.stream().filter(item -> item.getStatus().equals("Present") || item.getStatus().equals("Late")).count();
        double attendanceRate = allAttendance.isEmpty() ? 0 : (double) present / allAttendance.size() * 100;

        Map<String, Long> classCounts = allStudents.stream()
                .collect(Collectors.groupingBy(Student::getClassName, Collectors.counting()));
        List<SchoolDtos.ClassCount> studentsByClass = classCounts.entrySet().stream()
                .map(item -> new SchoolDtos.ClassCount(item.getKey(), item.getValue().intValue()))
                .sorted(Comparator.comparing(SchoolDtos.ClassCount::name))
                .toList();

        List<SchoolDtos.AttendanceTrend> trend = new ArrayList<>();
        for (int daysAgo = 6; daysAgo >= 0; daysAgo--) {
            LocalDate day = today.minusDays(daysAgo);
            List<Attendance> records = allAttendance.stream().filter(item -> day.equals(item.getDate())).toList();
            int dayPresent = (int) records.stream().filter(item -> item.getStatus().equals("Present") || item.getStatus().equals("Late")).count();
            int dayAbsent = (int) records.stream().filter(item -> item.getStatus().equals("Absent")).count();
            trend.add(new SchoolDtos.AttendanceTrend(day.getDayOfWeek().getDisplayName(java.time.format.TextStyle.SHORT,
                    java.util.Locale.US), dayPresent, dayAbsent));
        }

        List<SchoolDtos.Activity> activity = new ArrayList<>();
        allLeaves.stream().limit(3).forEach(item -> activity.add(new SchoolDtos.Activity(item.getId(),
                item.getStudent().getFirstName() + " " + item.getStudent().getLastName() + " requested leave",
                item.getReason(), item.getRequestedOn().toString(), "leave")));
        allAttendance.stream().limit(3).forEach(item -> activity.add(new SchoolDtos.Activity(item.getId() + 1000,
                item.getStudent().getFirstName() + " " + item.getStudent().getLastName() + " marked " + item.getStatus().toLowerCase(),
                item.getMethod() + " attendance capture", item.getDate().toString(), "attendance")));

        return new SchoolDtos.Dashboard(
                (int) allStudents.stream().filter(item -> "Active".equals(item.getStatus())).count(),
                presentToday,
                (int) allLeaves.stream().filter(item -> "Pending".equals(item.getStatus())).count(),
                round(averageScore),
                round(attendanceRate),
                studentsByClass,
                trend,
                activity.stream().limit(5).toList());
    }

    private Student requireStudent(Long id) {
        return students.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
    }

    private SchoolDtos.StudentResponse studentResponse(Student student) {
        List<Attendance> records = attendance.findByStudentId(student.getId());
        long present = records.stream().filter(item -> item.getStatus().equals("Present") || item.getStatus().equals("Late")).count();
        double attendanceRate = records.isEmpty() ? 100 : (double) present / records.size() * 100;
        List<Performance> marks = performance.findByStudentId(student.getId());
        double averageScore = marks.isEmpty() ? 0 : marks.stream()
                .mapToDouble(item -> item.getScore() / item.getMaxScore() * 100).average().orElse(0);
        return new SchoolDtos.StudentResponse(student.getId(), student.getStudentId(), student.getFirstName(),
                student.getLastName(), student.getDateOfBirth(), student.getGender(), student.getEmail(),
                student.getPhone(), student.getClassName(), student.getEnrollmentDate(), student.getStatus(),
                round(attendanceRate), round(averageScore));
    }

    private SchoolDtos.AttendanceResponse attendanceResponse(Attendance item) {
        return new SchoolDtos.AttendanceResponse(item.getId(), item.getStudent().getId(),
                item.getStudent().getFirstName() + " " + item.getStudent().getLastName(), item.getDate(),
                item.getStatus(), item.getMethod(), item.getCheckIn());
    }

    private SchoolDtos.PerformanceResponse performanceResponse(Performance item) {
        double percentage = item.getScore() / item.getMaxScore() * 100;
        return new SchoolDtos.PerformanceResponse(item.getId(), item.getStudent().getId(),
                item.getStudent().getFirstName() + " " + item.getStudent().getLastName(), item.getSubject(),
                item.getTerm(), item.getScore(), item.getMaxScore(), round(percentage), grade(percentage));
    }

    private SchoolDtos.LeaveResponse leaveResponse(LeaveRequest item) {
        return new SchoolDtos.LeaveResponse(item.getId(), item.getStudent().getId(),
                item.getStudent().getFirstName() + " " + item.getStudent().getLastName(), item.getReason(),
                item.getStartDate(), item.getEndDate(), item.getStatus(), item.getRequestedOn());
    }

    private SchoolDtos.ClassResponse classResponse(SchoolClass item, int count) {
        return new SchoolDtos.ClassResponse(item.getId(), item.getName(), item.getGrade(), item.getSection(),
                item.getTeacher(), item.getRoom(), count, item.getCapacity());
    }

    private static String grade(double percentage) {
        if (percentage >= 90) return "A";
        if (percentage >= 80) return "B";
        if (percentage >= 70) return "C";
        if (percentage >= 60) return "D";
        return "F";
    }

    private static double round(double value) {
        return BigDecimal.valueOf(value).setScale(1, RoundingMode.HALF_UP).doubleValue();
    }

    private static final class SortHelper {
        private SortHelper() {}
        static org.springframework.data.domain.Sort byLastName() {
            return org.springframework.data.domain.Sort.by("lastName").ascending();
        }
    }
}