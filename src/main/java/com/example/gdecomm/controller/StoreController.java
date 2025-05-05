package com.example.gdecomm.controller;

import com.example.gdecomm.model.Store;
import com.example.gdecomm.model.User;
import com.example.gdecomm.payload.dto.StoreDTO;
import com.example.gdecomm.repository.StoreRepository;
import com.example.gdecomm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/store")
public class StoreController {
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/list")
    public ResponseEntity<List<StoreDTO>> getAllStores() {
        List<StoreDTO> stores = storeRepository.findByIsActiveTrue().stream()
                .map(store -> new StoreDTO(
                        store.getId(),
                        store.getName(),
                        store.getDescription(),
                        store.getSeller().getId(),
                        store.getIsActive()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(stores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreDTO> getStore(@PathVariable Long id) {
        Store store = storeRepository.findById(id).orElseThrow();
        StoreDTO dto = new StoreDTO(
                store.getId(),
                store.getName(),
                store.getDescription(),
                store.getSeller().getId(),
                store.getIsActive()
        );
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/my-store")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<StoreDTO> getMyStore() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User seller = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new RuntimeException("User not found"));
        Store store = storeRepository.findBySeller(seller).orElseThrow(() -> new RuntimeException("Current seller does not have a store"));
        StoreDTO dto = new StoreDTO(
            store.getId(),
            store.getName(),
            store.getDescription(),
            store.getSeller().getId(),
            store.getIsActive()
        );
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<StoreDTO> updateStore(@PathVariable Long id, @RequestBody StoreDTO storeDTO) {
        Store store = storeRepository.findById(id).orElseThrow();
        store.setName(storeDTO.getName());
        store.setDescription(storeDTO.getDescription());
        Store updated = storeRepository.save(store);
        return ResponseEntity.ok(new StoreDTO(
                updated.getId(),
                updated.getName(),
                updated.getDescription(),
                updated.getSeller().getId(),
                updated.getIsActive()
        ));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Void> deleteStore(@PathVariable Long id) {
        Store store = storeRepository.findById(id).orElseThrow();
        store.setIsActive(false);
        storeRepository.save(store);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully!");
    }
} 