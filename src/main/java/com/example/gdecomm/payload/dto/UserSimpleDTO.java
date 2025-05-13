package com.example.gdecomm.payload.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSimpleDTO {
    private Long id;
    private String username;
    private String email;
    private Set<String> roles;
    private String avatar;
    private String gender;
    private java.time.LocalDate birthday;
    private String signature;
} 