package com.example.gdecomm.payload.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {
    private Long id;
    private Long userId;
    private String receiverName;
    private String phone;
    private String country;
    private String province;
    private String city;
    private String detail;
    private String zipCode;
    private Boolean isDefault;
} 