package com.example.gdecomm.service.impl;

import com.example.gdecomm.model.Product;
import com.example.gdecomm.repository.ProductRepository;
import com.example.gdecomm.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public List<Product> getAllProducts(String sortOrder) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), "price");
        return productRepository.findAll(sort);
    }

    @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
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

    @Override
    public List<Product> getAvailableProducts(String sortOrder) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), "price");
        return productRepository.findByIsAvailableTrue(sort);
    }

    @Override
    public Page<Product> getAvailableProducts(Pageable pageable) {
        return productRepository.findByIsAvailableTrue(pageable);
    }

    @Override
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Product> searchProductsByName(String name, String sortOrder) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), "price");
        return productRepository.findByNameContainingIgnoreCase(name, sort);
    }

    @Override
    public Page<Product> searchProductsByName(String name, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    @Override
    public List<Product> searchAvailableProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCaseAndIsAvailableTrue(name);
    }

    @Override
    public List<Product> searchAvailableProductsByName(String name, String sortOrder) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), "price");
        return productRepository.findByNameContainingIgnoreCaseAndIsAvailableTrue(name, sort);
    }

    @Override
    public Page<Product> searchAvailableProductsByName(String name, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCaseAndIsAvailableTrue(name, pageable);
    }

    public Product updateProductIsAvailable(Long id, Boolean isAvailable) {
        Product existingProduct = getProductById(id);
        existingProduct.setIsAvailable(isAvailable);
        return productRepository.save(existingProduct);
    }
} 