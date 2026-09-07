package com.example.vit_result.model;

public class SubjectResult {

    private String name;
    private double mse;
    private double ese;
    private double finalMarks;

    public SubjectResult() {
    }

    public SubjectResult(String name, double mse, double ese) {
        this.name = name;
        this.mse = mse;
        this.ese = ese;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getMse() {
        return mse;
    }

    public void setMse(double mse) {
        this.mse = mse;
    }

    public double getEse() {
        return ese;
    }

    public void setEse(double ese) {
        this.ese = ese;
    }

    public double getFinalMarks() {
        return finalMarks;
    }

    public void setFinalMarks(double finalMarks) {
        this.finalMarks = finalMarks;
    }
}