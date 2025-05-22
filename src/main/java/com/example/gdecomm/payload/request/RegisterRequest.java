package com.example.gdecomm.payload.request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String role; // BUYER or SELLER
    // Optional fields for profile completion
    private String firstName;
    private String lastName;
    private String avatar;
    private String gender;
    private LocalDate birthday;
    private String signature;
} 