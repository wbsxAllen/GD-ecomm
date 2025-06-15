package com.example.gdecomm.payload.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private Long cartId;
    private Long userId;
    private List<CartItemDTO> items;
    private Double totalAmount;

    public CartDTO(Long cartId, Long userId, List<CartItemDTO> items) {
        this.cartId = cartId;
        this.userId = userId;
        this.items = items;
        this.totalAmount = items == null ? 0.0 : items.stream()
            .mapToDouble(i -> i.getPrice() * i.getQuantity())
            .sum();
    }
} 