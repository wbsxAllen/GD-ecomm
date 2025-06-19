package com.example.gdecomm.controller;

import com.example.gdecomm.model.Order;
import com.example.gdecomm.model.OrderStatus;
import com.example.gdecomm.model.Payment;
import com.example.gdecomm.model.PaymentStatus;
import com.example.gdecomm.payload.request.CreatePaymentIntentRequest;
import com.example.gdecomm.payload.request.PaymentConfirmationRequest;
import com.example.gdecomm.service.OrderService;
import com.example.gdecomm.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private StripeService stripeService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/create-payment-intent")
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<?> createPaymentIntent(@RequestBody CreatePaymentIntentRequest request) {
        try {
            Order order = orderService.getOrderById(request.getOrderId());
            Payment payment = stripeService.createPaymentIntent(
                order,
                request.getAmount(),
                request.getCurrency()
            );

            Map<String, String> responseData = new HashMap<>();
            responseData.put("clientSecret", payment.getClientSecret());
            responseData.put("paymentIntentId", payment.getPaymentIntentId());

            return ResponseEntity.ok(responseData);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/payment-intent/{id}")
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<?> getPaymentIntent(@PathVariable String id) {
        try {
            PaymentIntent paymentIntent = stripeService.retrievePaymentIntent(id);
            Map<String, Object> result = new HashMap<>();
            result.put("id", paymentIntent.getId());
            result.put("status", paymentIntent.getStatus());
            result.put("amount", paymentIntent.getAmount());
            result.put("currency", paymentIntent.getCurrency());
            return ResponseEntity.ok(result);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/confirm")
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<?> confirmPayment(@RequestBody PaymentConfirmationRequest request) {
        try {
            Payment payment = stripeService.updatePaymentStatus(
                request.getPaymentIntentId(),
                PaymentStatus.SUCCEEDED,
                null
            );
            
            orderService.updateOrderStatus(payment.getOrder().getId(), OrderStatus.PAID);
            
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            // Handle Stripe webhook events
            // Implement webhook handling logic here
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 