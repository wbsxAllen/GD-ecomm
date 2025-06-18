package com.example.gdecomm.repository;

import com.example.gdecomm.model.Payment;
import com.example.gdecomm.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrder(Order order);
    Optional<Payment> findByPaymentIntentId(String paymentIntentId);
} 