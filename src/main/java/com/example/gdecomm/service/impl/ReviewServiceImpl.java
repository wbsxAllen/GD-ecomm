package com.example.gdecomm.service.impl;

import com.example.gdecomm.model.User;
import com.example.gdecomm.model.OrderStatus;
import com.example.gdecomm.repository.OrderRepository;
import com.example.gdecomm.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final OrderRepository orderRepository;

    @Autowired
    public ReviewServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public boolean canUserReviewProduct(User user, Long productId) {
        return orderRepository.existsPaidOrderWithProduct(user, OrderStatus.PAID, productId);
    }
} 