package com.example.gdecomm.controller;

import com.example.gdecomm.model.Address;
import com.example.gdecomm.model.User;
import com.example.gdecomm.payload.dto.AddressDTO;
import com.example.gdecomm.repository.AddressRepository;
import com.example.gdecomm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/list")
    public List<AddressDTO> list(@RequestParam Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return addressRepository.findByUser(user).stream()
                .map(a -> new AddressDTO(a.getId(), userId, a.getReceiverName(), a.getPhone(), a.getProvince(), a.getCity(), a.getDistrict(), a.getDetail(), a.getZipCode(), a.getIsDefault()))
                .collect(Collectors.toList());
    }

    @PostMapping("/add")
    public AddressDTO add(@RequestBody AddressDTO dto) {
        User user = userRepository.findById(dto.getUserId()).orElseThrow();
        Address a = new Address();
        a.setUser(user);
        a.setReceiverName(dto.getReceiverName());
        a.setPhone(dto.getPhone());
        a.setProvince(dto.getProvince());
        a.setCity(dto.getCity());
        a.setDistrict(dto.getDistrict());
        a.setDetail(dto.getDetail());
        a.setZipCode(dto.getZipCode());
        a.setIsDefault(dto.getIsDefault() != null ? dto.getIsDefault() : false);
        Address saved = addressRepository.save(a);
        return new AddressDTO(saved.getId(), user.getId(), saved.getReceiverName(), saved.getPhone(), saved.getProvince(), saved.getCity(), saved.getDistrict(), saved.getDetail(), saved.getZipCode(), saved.getIsDefault());
    }

    @PutMapping("/update")
    public AddressDTO update(@RequestBody AddressDTO dto) {
        Address a = addressRepository.findById(dto.getId()).orElseThrow();
        a.setReceiverName(dto.getReceiverName());
        a.setPhone(dto.getPhone());
        a.setProvince(dto.getProvince());
        a.setCity(dto.getCity());
        a.setDistrict(dto.getDistrict());
        a.setDetail(dto.getDetail());
        a.setZipCode(dto.getZipCode());
        a.setIsDefault(dto.getIsDefault() != null ? dto.getIsDefault() : false);
        Address saved = addressRepository.save(a);
        return new AddressDTO(saved.getId(), saved.getUser().getId(), saved.getReceiverName(), saved.getPhone(), saved.getProvince(), saved.getCity(), saved.getDistrict(), saved.getDetail(), saved.getZipCode(), saved.getIsDefault());
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam Long id) {
        addressRepository.deleteById(id);
    }

    @PutMapping("/set-default")
    public void setDefault(@RequestParam Long userId, @RequestParam Long id) {
        User user = userRepository.findById(userId).orElseThrow();
        List<Address> addresses = addressRepository.findByUser(user);
        for (Address a : addresses) {
            a.setIsDefault(a.getId().equals(id));
            addressRepository.save(a);
        }
    }
} 