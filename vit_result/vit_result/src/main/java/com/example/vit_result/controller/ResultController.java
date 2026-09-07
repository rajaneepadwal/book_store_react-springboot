package com.example.vit_result.controller;

import com.example.vit_result.model.ResultRequest;
import com.example.vit_result.model.ResultResponse;
import com.example.vit_result.service.ResultService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping
    public ResultResponse calculateResult(
            @RequestBody ResultRequest request) {

        return resultService.calculateResult(request);
    }
} 