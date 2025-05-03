package com.example.gdecomm.controller;

import com.example.gdecomm.model.ERole;
import com.example.gdecomm.model.Role;
import com.example.gdecomm.model.User;
import com.example.gdecomm.payload.request.RegisterRequest;
import com.example.gdecomm.repository.RoleRepository;
import com.example.gdecomm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        // Create new user
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setEmail(signUpRequest.getEmail());
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setEnabled(true);
        // give role
        ERole roleEnum = signUpRequest.getRole().equalsIgnoreCase("SELLER") ? ERole.ROLE_SELLER : ERole.ROLE_BUYER;
        Role role = roleRepository.findByName(roleEnum).orElseGet(() -> roleRepository.save(new Role(roleEnum)));
        user.setRoles(Collections.singleton(role));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }
} 