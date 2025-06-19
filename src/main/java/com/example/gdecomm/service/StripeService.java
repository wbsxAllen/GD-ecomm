package com.example.gdecomm.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.example.gdecomm.model.Payment;
import com.example.gdecomm.model.Order;
import com.example.gdecomm.model.PaymentMethod;
import com.example.gdecomm.model.PaymentStatus;
import com.example.gdecomm.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;

@Service
public class StripeService {
    @Value("${stripe.secret.key}")
    private String stripeApiKey;

    private final PaymentRepository paymentRepository;

    public StripeService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @Transactional
    public Payment createPaymentIntent(Order order, Long amount, String currency) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)
                .setCurrency(currency)
                .setAutomaticPaymentMethods(
                    PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                        .setEnabled(true)
                        .build()
                )
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setPaymentIntentId(paymentIntent.getId());
        payment.setClientSecret(paymentIntent.getClientSecret());
        payment.setPaymentMethod(PaymentMethod.STRIPE);
        payment.setStatus(PaymentStatus.PENDING);
        payment.setAmount(BigDecimal.valueOf(amount).divide(BigDecimal.valueOf(100))); // Convert cents to dollars
        payment.setCurrency(currency);

        return paymentRepository.save(payment);
    }

    public PaymentIntent retrievePaymentIntent(String paymentIntentId) throws StripeException {
        return PaymentIntent.retrieve(paymentIntentId);
    }

    @Transactional
    public Payment updatePaymentStatus(String paymentIntentId, PaymentStatus status, String errorMessage) {
        Payment payment = paymentRepository.findByPaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        
        payment.setStatus(status);
        if (errorMessage != null) {
            payment.setErrorMessage(errorMessage);
        }
        
        return paymentRepository.save(payment);
    }
} 