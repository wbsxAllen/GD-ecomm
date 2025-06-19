package com.example.gdecomm.service.impl;

import com.example.gdecomm.model.Product;
import com.example.gdecomm.repository.ProductRepository;
import com.example.gdecomm.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        Product existingProduct = getProductById(id);
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());
        existingProduct.setScale(product.getScale());
        existingProduct.setGrade(product.getGrade());
        existingProduct.setSeries(product.getSeries());
        existingProduct.setImageUrl(product.getImageUrl());
        existingProduct.setIsAvailable(product.getIsAvailable());
        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getProductsByGrade(String grade) {
        return productRepository.findByGrade(grade);
    }

    @Override
    public List<Product> getProductsByScale(String scale) {
        return productRepository.findByScale(scale);
    }

    @Override
    public List<Product> getProductsBySeries(String series) {
        return productRepository.findBySeries(series);
    }

    @Override
    public List<Product> getAvailableProducts() {
        return productRepository.findByIsAvailableTrue();
    }

    public Product updateProductIsAvailable(Long id, Boolean isAvailable) {
        Product existingProduct = getProductById(id);
        existingProduct.setIsAvailable(isAvailable);
        return productRepository.save(existingProduct);
    }
} 