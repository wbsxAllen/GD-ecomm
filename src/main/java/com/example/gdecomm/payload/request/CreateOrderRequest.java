package com.example.gdecomm.payload.request;

import lombok.Data;
import java.util.List;

@Data
public class CreateOrderRequest {
    private Long addressId; 
    private List<OrderItemRequest> items; 

    @Data
    public static class OrderItemRequest {
        private Long productId;
        private Integer quantity;
    }
} 