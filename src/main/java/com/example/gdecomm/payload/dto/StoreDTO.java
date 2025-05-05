package com.example.gdecomm.payload.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreDTO {
    private Long id;
    private String name;
    private String description;
    private Long sellerId;
    private Boolean isActive;
} 