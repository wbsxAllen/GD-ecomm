package com.example.gdecomm.payload.request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UpdateUserProfileRequest {
    private String avatar;
    private String gender;
    private LocalDate birthday;
    private String signature;
} 