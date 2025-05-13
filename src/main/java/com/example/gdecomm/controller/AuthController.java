package com.example.gdecomm.controller;

import com.example.gdecomm.model.ERole;
import com.example.gdecomm.model.Role;
import com.example.gdecomm.model.User;
import com.example.gdecomm.model.Store;
import com.example.gdecomm.payload.request.LoginRequest;
import com.example.gdecomm.payload.request.RegisterRequest;
import com.example.gdecomm.payload.response.JwtResponse;
import com.example.gdecomm.payload.dto.UserSimpleDTO;
import com.example.gdecomm.repository.RoleRepository;
import com.example.gdecomm.repository.UserRepository;
import com.example.gdecomm.repository.StoreRepository;
import com.example.gdecomm.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private StoreRepository storeRepository;

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
        user.setAvatar(signUpRequest.getAvatar());
        user.setGender(signUpRequest.getGender());
        user.setBirthday(signUpRequest.getBirthday());
        user.setSignature(signUpRequest.getSignature());
        user.setEnabled(true);
        // give role
        ERole roleEnum = signUpRequest.getRole().equalsIgnoreCase("SELLER") ? ERole.ROLE_SELLER : ERole.ROLE_BUYER;
        Role role = roleRepository.findByName(roleEnum).orElseGet(() -> roleRepository.save(new Role(roleEnum)));
        user.setRoles(Collections.singleton(role));
        userRepository.save(user);

        if (roleEnum == ERole.ROLE_SELLER) {
            Store store = new Store();
            store.setName(user.getUsername() + "'s store");
            store.setDescription("Welcome!");
            store.setSeller(user);
            store.setIsActive(true);
            storeRepository.save(store);
        }

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElse(null);
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
        
        Set<String> roles = user.getRoles().stream().map(r -> r.getName().name()).collect(java.util.stream.Collectors.toSet());
        String token = jwtUtil.generateToken(user.getUsername(), roles);
        return ResponseEntity.ok(new JwtResponse(token, user.getUsername(), roles));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<UserSimpleDTO> getUserByUsername(@PathVariable String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        UserSimpleDTO dto = new UserSimpleDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRoles(user.getRoles().stream().map(r -> r.getName().name()).collect(java.util.stream.Collectors.toSet()));
        dto.setAvatar(user.getAvatar());
        dto.setGender(user.getGender());
        dto.setBirthday(user.getBirthday());
        dto.setSignature(user.getSignature());
        return ResponseEntity.ok(dto);
    }
} 