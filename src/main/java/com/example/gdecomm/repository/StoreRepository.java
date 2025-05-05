package com.example.gdecomm.repository;

import com.example.gdecomm.model.Store;
import com.example.gdecomm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findBySeller(User seller);
    List<Store> findByIsActiveTrue();
} 