package com.example.gdecomm.payload.request;

import lombok.Data;

@Data
public class CreateReviewRequest {
    private Long productId;
    private Integer rating;
    private String content;
} 