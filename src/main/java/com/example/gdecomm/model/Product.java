package com.example.gdecomm.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.Data;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private String scale; // 1_144, 1_100, 1_60

    @Column(nullable = false)
    private String grade; // HG, MG, PG, RG

    @Column(nullable = false)
    private String series; // UC, SEED, 00

    private String imageUrl;

    @Column(nullable = false)
    private Boolean isAvailable = true;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;
} 