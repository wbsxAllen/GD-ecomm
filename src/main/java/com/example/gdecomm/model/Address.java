package com.example.gdecomm.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "addresses")
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String receiverName;
    private String phone;
    private String country;
    private String province;
    private String city;
    private String detail;
    private String zipCode;
    private Boolean isDefault = false;
} 