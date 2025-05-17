package com.example.gdecomm.controller;

import com.example.gdecomm.model.User;
import com.example.gdecomm.model.Role;
import com.example.gdecomm.model.ERole;
import com.example.gdecomm.repository.UserRepository;
import com.example.gdecomm.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/users/{id}/grant-admin")
    public ResponseEntity<?> grantAdmin(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow();
        user.getRoles().add(adminRole);
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/{id}/revoke-admin")
    public ResponseEntity<?> revokeAdmin(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow();
        user.getRoles().remove(adminRole);
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
} 