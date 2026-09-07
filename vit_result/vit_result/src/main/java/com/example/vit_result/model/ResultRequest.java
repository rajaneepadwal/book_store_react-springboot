package com.example.vit_result.model;

import java.util.List;

public class ResultRequest {

    private String prn;
    private String studentName;
    private List<SubjectResult> subjects;

    public ResultRequest() {
    }

    public String getPrn() {
        return prn;
    }

    public void setPrn(String prn) {
        this.prn = prn;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public List<SubjectResult> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectResult> subjects) {
        this.subjects = subjects;
    }
} 