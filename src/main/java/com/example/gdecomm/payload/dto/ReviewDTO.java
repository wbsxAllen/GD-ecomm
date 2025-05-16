package com.example.gdecomm.payload.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewDTO {
    private Long id;
    private Long userId;
    private String username;
    private String userAvatar;
    private Long productId;
    private String productName;
    private Integer rating;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 