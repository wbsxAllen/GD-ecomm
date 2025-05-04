package com.example.gdecomm.controller;

import com.example.gdecomm.model.Product;
import com.example.gdecomm.service.ProductService;
import com.example.gdecomm.payload.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> dtos = productService.getAllProducts().stream()
            .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Product p = productService.getProductById(id);
        ProductDTO dto = new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable());
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO dto) {
        Product p = new Product();
        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setPrice(dto.getPrice());
        p.setStock(dto.getStock());
        p.setScale(dto.getScale());
        p.setGrade(dto.getGrade());
        p.setSeries(dto.getSeries());
        p.setImageUrl(dto.getImageUrl());
        p.setIsAvailable(dto.getIsAvailable());
        Product saved = productService.createProduct(p);
        ProductDTO savedDto = new ProductDTO(saved.getId(), saved.getName(), saved.getDescription(), saved.getPrice(), saved.getStock(), saved.getScale(), saved.getGrade(), saved.getSeries(), saved.getImageUrl(), saved.getIsAvailable());
        return ResponseEntity.ok(savedDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto) {
        Product p = new Product();
        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setPrice(dto.getPrice());
        p.setStock(dto.getStock());
        p.setScale(dto.getScale());
        p.setGrade(dto.getGrade());
        p.setSeries(dto.getSeries());
        p.setImageUrl(dto.getImageUrl());
        p.setIsAvailable(dto.getIsAvailable());
        Product updated = productService.updateProduct(id, p);
        ProductDTO updatedDto = new ProductDTO(updated.getId(), updated.getName(), updated.getDescription(), updated.getPrice(), updated.getStock(), updated.getScale(), updated.getGrade(), updated.getSeries(), updated.getImageUrl(), updated.getIsAvailable());
        return ResponseEntity.ok(updatedDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/grade/{grade}")
    public ResponseEntity<List<ProductDTO>> getProductsByGrade(@PathVariable String grade) {
        List<ProductDTO> dtos = productService.getProductsByGrade(grade).stream()
            .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/scale/{scale}")
    public ResponseEntity<List<ProductDTO>> getProductsByScale(@PathVariable String scale) {
        String normalizedScale = scale.replace('_', '/');
        List<ProductDTO> dtos = productService.getProductsByScale(normalizedScale).stream()
            .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/series/{series}")
    public ResponseEntity<List<ProductDTO>> getProductsBySeries(@PathVariable String series) {
        List<ProductDTO> dtos = productService.getProductsBySeries(series).stream()
            .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/available")
    public ResponseEntity<List<ProductDTO>> getAvailableProducts() {
        List<ProductDTO> dtos = productService.getAvailableProducts().stream()
            .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
} 