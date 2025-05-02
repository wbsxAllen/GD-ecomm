package com.example.gdecomm.controller;

import com.example.gdecomm.model.Product;
import com.example.gdecomm.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.createProduct(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/grade/{grade}")
    public ResponseEntity<List<Product>> getProductsByGrade(@PathVariable String grade) {
        return ResponseEntity.ok(productService.getProductsByGrade(grade));
    }

    @GetMapping("/scale/{scale}")
    public ResponseEntity<List<Product>> getProductsByScale(@PathVariable String scale) {
        return ResponseEntity.ok(productService.getProductsByScale(scale));
    }

    @GetMapping("/series/{series}")
    public ResponseEntity<List<Product>> getProductsBySeries(@PathVariable String series) {
        return ResponseEntity.ok(productService.getProductsBySeries(series));
    }

    @GetMapping("/available")
    public ResponseEntity<List<Product>> getAvailableProducts() {
        return ResponseEntity.ok(productService.getAvailableProducts());
    }
} 