package com.example.gdecomm.service;

import com.example.gdecomm.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    List<Product> getAllProducts(String sortOrder);
    Page<Product> getAllProducts(Pageable pageable);
    Product getProductById(Long id);
    Product createProduct(Product product);
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);
    List<Product> getProductsByGrade(String grade);
    List<Product> getProductsByScale(String scale);
    List<Product> getProductsBySeries(String series);
    List<Product> getAvailableProducts();
    List<Product> getAvailableProducts(String sortOrder);
    Page<Product> getAvailableProducts(Pageable pageable);
    
    // Add search methods
    List<Product> searchProductsByName(String name);
    List<Product> searchProductsByName(String name, String sortOrder);
    Page<Product> searchProductsByName(String name, Pageable pageable);
    List<Product> searchAvailableProductsByName(String name);
    List<Product> searchAvailableProductsByName(String name, String sortOrder);
    Page<Product> searchAvailableProductsByName(String name, Pageable pageable);
} 