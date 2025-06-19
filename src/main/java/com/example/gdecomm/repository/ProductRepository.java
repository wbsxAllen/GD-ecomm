package com.example.gdecomm.repository;

import com.example.gdecomm.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByGrade(String grade);
    List<Product> findByScale(String scale);
    List<Product> findBySeries(String series);
    
    Page<Product> findByIsAvailableTrue(Pageable pageable);
    List<Product> findByIsAvailableTrue(Sort sort);
    List<Product> findByIsAvailableTrue();
    
    // Add search by name (case-insensitive)
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
    List<Product> findByNameContainingIgnoreCase(String name, Sort sort);
    List<Product> findByNameContainingIgnoreCase(String name);
    
    // Add search by name and available status
    Page<Product> findByNameContainingIgnoreCaseAndIsAvailableTrue(String name, Pageable pageable);
    List<Product> findByNameContainingIgnoreCaseAndIsAvailableTrue(String name, Sort sort);
    List<Product> findByNameContainingIgnoreCaseAndIsAvailableTrue(String name);
} 