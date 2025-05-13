package com.example.gdecomm.controller;

import com.example.gdecomm.model.User;
import com.example.gdecomm.payload.dto.UserSimpleDTO;
import com.example.gdecomm.payload.request.UpdateUserProfileRequest;
import com.example.gdecomm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<UserSimpleDTO> getProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        UserSimpleDTO dto = new UserSimpleDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles().stream().map(r -> r.getName().name()).collect(java.util.stream.Collectors.toSet()),
                user.getAvatar(),
                user.getGender(),
                user.getBirthday(),
                user.getSignature()
        );
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserSimpleDTO> updateProfile(@RequestBody UpdateUserProfileRequest req) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        user.setAvatar(req.getAvatar());
        user.setGender(req.getGender());
        user.setBirthday(req.getBirthday());
        user.setSignature(req.getSignature());
        userRepository.save(user);
        UserSimpleDTO dto = new UserSimpleDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles().stream().map(r -> r.getName().name()).collect(java.util.stream.Collectors.toSet()),
                user.getAvatar(),
                user.getGender(),
                user.getBirthday(),
                user.getSignature()
        );
        return ResponseEntity.ok(dto);
    }
} 