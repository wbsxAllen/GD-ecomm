package com.example.gdecomm.repository;

import com.example.gdecomm.model.Order;
import com.example.gdecomm.model.User;
import com.example.gdecomm.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByCreateTimeDesc(User user);
    List<Order> findByUserAndStatusOrderByCreateTimeDesc(User user, OrderStatus status);
} 