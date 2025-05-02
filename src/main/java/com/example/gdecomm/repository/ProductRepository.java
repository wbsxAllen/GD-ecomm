package com.example.gdecomm.repository;

import com.example.gdecomm.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByGrade(String grade);
    List<Product> findByScale(String scale);
    List<Product> findBySeries(String series);
    List<Product> findByIsAvailableTrue();
} 