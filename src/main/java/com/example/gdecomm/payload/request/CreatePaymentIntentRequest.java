package com.example.gdecomm.payload.request;

import lombok.Data;

@Data
public class CreatePaymentIntentRequest {
    private Long orderId;
    private String currency;
    private Long amount; // amount in cents
}
