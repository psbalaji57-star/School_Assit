package com.northstar.studentmanagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "classes")
public class SchoolClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String grade;
    private String section;
    private String teacher;
    private String room;
    private int capacity;

    protected SchoolClass() {}

    public SchoolClass(String name, String grade, String section, String teacher, String room, int capacity) {
        this.name = name;
        this.grade = grade;
        this.section = section;
        this.teacher = teacher;
        this.room = room;
        this.capacity = capacity;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getGrade() { return grade; }
    public String getSection() { return section; }
    public String getTeacher() { return teacher; }
    public String getRoom() { return room; }
    public int getCapacity() { return capacity; }
}