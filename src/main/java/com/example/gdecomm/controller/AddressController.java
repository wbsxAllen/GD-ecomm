package com.example.gdecomm.controller;

import com.example.gdecomm.model.Address;
import com.example.gdecomm.model.User;
import com.example.gdecomm.payload.dto.AddressDTO;
import com.example.gdecomm.repository.AddressRepository;
import com.example.gdecomm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/address")
public class AddressController {
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserRepository userRepository;

    /**
     * Get all addresses for the current authenticated user (recommended for frontend)
     */
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<AddressDTO> getMyAddresses() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        return addressRepository.findByUser(user).stream()
                .map(a -> new AddressDTO(a.getId(), user.getId(), a.getReceiverName(), a.getPhone(), a.getCountry(), a.getProvince(), a.getCity(), a.getDetail(), a.getZipCode(), a.getIsDefault()))
                .collect(Collectors.toList());
    }

    /**
     * Deprecated: Get addresses by userId (for backward compatibility, not recommended)
     */
    @GetMapping("/list")
    @Deprecated
    public List<AddressDTO> list(@RequestParam Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return addressRepository.findByUser(user).stream()
                .map(a -> new AddressDTO(a.getId(), userId, a.getReceiverName(), a.getPhone(), a.getCountry(), a.getProvince(), a.getCity(), a.getDetail(), a.getZipCode(), a.getIsDefault()))
                .collect(Collectors.toList());
    }

    /**
     * Add a new address for the current authenticated user
     */
    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public AddressDTO add(@RequestBody AddressDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        Address a = new Address();
        a.setUser(user);
        a.setReceiverName(dto.getReceiverName());
        a.setPhone(dto.getPhone());
        a.setCountry(dto.getCountry());
        a.setProvince(dto.getProvince());
        a.setCity(dto.getCity());
        a.setDetail(dto.getDetail());
        a.setZipCode(dto.getZipCode());
        a.setIsDefault(dto.getIsDefault() != null ? dto.getIsDefault() : false);
        Address saved = addressRepository.save(a);
        return new AddressDTO(saved.getId(), user.getId(), saved.getReceiverName(), saved.getPhone(), saved.getCountry(), saved.getProvince(), saved.getCity(), saved.getDetail(), saved.getZipCode(), saved.getIsDefault());
    }

    /**
     * Update an address (only if it belongs to the current user)
     */
    @PutMapping("/update")
    @PreAuthorize("isAuthenticated()")
    public AddressDTO update(@RequestBody AddressDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        Address a = addressRepository.findById(dto.getId()).orElseThrow();
        if (!a.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You can only update your own address");
        }
        a.setReceiverName(dto.getReceiverName());
        a.setPhone(dto.getPhone());
        a.setCountry(dto.getCountry());
        a.setProvince(dto.getProvince());
        a.setCity(dto.getCity());
        a.setDetail(dto.getDetail());
        a.setZipCode(dto.getZipCode());
        a.setIsDefault(dto.getIsDefault() != null ? dto.getIsDefault() : false);
        Address saved = addressRepository.save(a);
        return new AddressDTO(saved.getId(), saved.getUser().getId(), saved.getReceiverName(), saved.getPhone(), saved.getCountry(), saved.getProvince(), saved.getCity(), saved.getDetail(), saved.getZipCode(), saved.getIsDefault());
    }

    /**
     * Delete an address (only if it belongs to the current user)
     */
    @DeleteMapping("/delete")
    @PreAuthorize("isAuthenticated()")
    public void delete(@RequestParam Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        Address a = addressRepository.findById(id).orElseThrow();
        if (!a.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You can only delete your own address");
        }
        addressRepository.deleteById(id);
    }

    /**
     * Set default address (only for current user)
     */
    @PutMapping("/set-default")
    @PreAuthorize("isAuthenticated()")
    public void setDefault(@RequestParam Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        List<Address> addresses = addressRepository.findByUser(user);
        for (Address a : addresses) {
            a.setIsDefault(a.getId().equals(id));
            addressRepository.save(a);
        }
    }
} 