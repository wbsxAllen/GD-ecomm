package com.example.gdecomm.payload.request;

import lombok.Data;

@Data
public class PaymentConfirmationRequest {
    private String paymentIntentId;
    private String status;
    private String message;
} 