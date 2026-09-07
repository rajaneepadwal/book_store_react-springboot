package com.example.vit_result.model;

import java.util.List;

public class ResultResponse {

    private String prn;
    private String studentName;
    private List<SubjectResult> subjects;
    private double percentage;

    public ResultResponse() {
    }

    public ResultResponse(
            String prn,
            String studentName,
            List<SubjectResult> subjects,
            double percentage) {

        this.prn = prn;
        this.studentName = studentName;
        this.subjects = subjects;
        this.percentage = percentage;
    }

    public String getPrn() {
        return prn;
    }

    public String getStudentName() {
        return studentName;
    }

    public List<SubjectResult> getSubjects() {
        return subjects;
    }

    public double getPercentage() {
        return percentage;
    }
}