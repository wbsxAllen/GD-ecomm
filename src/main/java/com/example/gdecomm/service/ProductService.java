package com.example.gdecomm.service;

import com.example.gdecomm.model.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product createProduct(Product product);
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);
    List<Product> getProductsByGrade(String grade);
    List<Product> getProductsByScale(String scale);
    List<Product> getProductsBySeries(String series);
    List<Product> getAvailableProducts();
} 