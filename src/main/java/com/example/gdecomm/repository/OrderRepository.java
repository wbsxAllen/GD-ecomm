package com.example.gdecomm.repository;

import com.example.gdecomm.model.Order;
import com.example.gdecomm.model.User;
import com.example.gdecomm.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByCreateTimeDesc(User user);
    Page<Order> findByUser(User user, Pageable pageable);
    List<Order> findByUserAndStatusOrderByCreateTimeDesc(User user, OrderStatus status);

    @Query("SELECT COUNT(oi) > 0 FROM Order o JOIN o.orderItems oi WHERE o.user = :user AND o.status = :status AND oi.product.id = :productId")
    boolean existsPaidOrderWithProduct(User user, com.example.gdecomm.model.OrderStatus status, Long productId);
} 