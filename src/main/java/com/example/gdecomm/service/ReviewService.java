package com.example.gdecomm.service;

import com.example.gdecomm.model.User;

public interface ReviewService {
    /**
     * Check if the user has the right to review a product (has purchased and paid)
     */
    boolean canUserReviewProduct(User user, Long productId);
} 