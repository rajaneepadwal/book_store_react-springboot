package com.example.vit_result.service;

import com.example.vit_result.model.ResultRequest;
import com.example.vit_result.model.ResultResponse;
import com.example.vit_result.model.SubjectResult;
import org.springframework.stereotype.Service;

@Service
public class ResultService {

    public ResultResponse calculateResult(ResultRequest request) {

        double total = 0;

        for (SubjectResult subject : request.getSubjects()) {

            double finalMarks =
                    (subject.getMse() * 0.30)
                    + (subject.getEse() * 0.70);

            finalMarks = Math.round(finalMarks * 100.0) / 100.0;

            subject.setFinalMarks(finalMarks);

            total += finalMarks;
        }

        double percentage =
                total / request.getSubjects().size();

        percentage = Math.round(percentage * 100.0) / 100.0;

        return new ResultResponse(
                request.getPrn(),
                request.getStudentName(),
                request.getSubjects(),
                percentage
        );
    }
} 