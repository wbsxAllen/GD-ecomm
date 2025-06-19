package com.example.gdecomm.controller;

import com.example.gdecomm.model.Product;
import com.example.gdecomm.model.Store;
import com.example.gdecomm.model.User;
import com.example.gdecomm.service.ProductService;
import com.example.gdecomm.payload.dto.ProductDTO;
import com.example.gdecomm.repository.StoreRepository;
import com.example.gdecomm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts(@RequestParam(value = "showAll", required = false) Boolean showAll) {
        List<Product> products;
        if (Boolean.TRUE.equals(showAll)) {
            products = productService.getAllProducts();
        } else {
            products = productService.getAvailableProducts();
        }
        List<ProductDTO> dtos = products.stream()
            .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable(), p.getStore().getId()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Product p = productService.getProductById(id);
        ProductDTO dto = new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable(), p.getStore().getId());
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User seller = userRepository.findByUsername(auth.getName()).orElseThrow();
        Store store = storeRepository.findBySeller(seller).orElseThrow();
        
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
        p.setStore(store);
        
        Product saved = productService.createProduct(p);
        ProductDTO savedDto = new ProductDTO(saved.getId(), saved.getName(), saved.getDescription(), saved.getPrice(), saved.getStock(), saved.getScale(), saved.getGrade(), saved.getSeries(), saved.getImageUrl(), saved.getIsAvailable(), saved.getStore().getId());
        return ResponseEntity.ok(savedDto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User seller = userRepository.findByUsername(auth.getName()).orElseThrow();
        Store store = storeRepository.findBySeller(seller).orElseThrow();
        
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
        p.setStore(store);
        
        Product updated = productService.updateProduct(id, p);
        ProductDTO updatedDto = new ProductDTO(updated.getId(), updated.getName(), updated.getDescription(), updated.getPrice(), updated.getStock(), updated.getScale(), updated.getGrade(), updated.getSeries(), updated.getImageUrl(), updated.getIsAvailable(), updated.getStore().getId());
        return ResponseEntity.ok(updatedDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/grade/{grade}")
    public ResponseEntity<List<ProductDTO>> getProductsByGrade(@PathVariable String grade) {
        List<ProductDTO> dtos = productService.getProductsByGrade(grade).stream()
            .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable(), p.getStore().getId()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/scale/{scale}")
    public ResponseEntity<List<ProductDTO>> getProductsByScale(@PathVariable String scale) {
        String normalizedScale = scale.replace('_', '/');
        List<ProductDTO> dtos = productService.getProductsByScale(normalizedScale).stream()
            .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable(), p.getStore().getId()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/series/{series}")
    public ResponseEntity<List<ProductDTO>> getProductsBySeries(@PathVariable String series) {
        List<ProductDTO> dtos = productService.getProductsBySeries(series).stream()
            .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable(), p.getStore().getId()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/available")
    public ResponseEntity<List<ProductDTO>> getAvailableProducts() {
        List<ProductDTO> dtos = productService.getAvailableProducts().stream()
            .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getStock(), p.getScale(), p.getGrade(), p.getSeries(), p.getImageUrl(), p.getIsAvailable(), p.getStore().getId()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<ProductDTO> patchProduct(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Product product = productService.getProductById(id);
        if (updates.containsKey("name")) product.setName((String) updates.get("name"));
        if (updates.containsKey("description")) product.setDescription((String) updates.get("description"));
        if (updates.containsKey("price")) product.setPrice(new java.math.BigDecimal(updates.get("price").toString()));
        if (updates.containsKey("stock")) product.setStock((Integer) updates.get("stock"));
        if (updates.containsKey("scale")) product.setScale((String) updates.get("scale"));
        if (updates.containsKey("grade")) product.setGrade((String) updates.get("grade"));
        if (updates.containsKey("series")) product.setSeries((String) updates.get("series"));
        if (updates.containsKey("imageUrl")) product.setImageUrl((String) updates.get("imageUrl"));
        if (updates.containsKey("isAvailable")) product.setIsAvailable((Boolean) updates.get("isAvailable"));
        Product updated = productService.updateProduct(id, product);
        ProductDTO dto = new ProductDTO(
            updated.getId(),
            updated.getName(),
            updated.getDescription(),
            updated.getPrice(),
            updated.getStock(),
            updated.getScale(),
            updated.getGrade(),
            updated.getSeries(),
            updated.getImageUrl(),
            updated.getIsAvailable(),
            updated.getStore().getId()
        );
        return ResponseEntity.ok(dto);
    }
} 