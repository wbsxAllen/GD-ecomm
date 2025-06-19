package com.example.gdecomm.controller;

import com.example.gdecomm.model.*;
import com.example.gdecomm.payload.dto.*;
import com.example.gdecomm.payload.request.CreateOrderRequest;
import com.example.gdecomm.service.OrderService;
import com.example.gdecomm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<OrderDTO> createOrder(@RequestBody CreateOrderRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        
        Order order = orderService.createOrder(user, request.getAddressId(), request.getItems());
        return ResponseEntity.ok(convertToDTO(order));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        
        Order order = orderService.getOrderById(id);
        if (!order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        return ResponseEntity.ok(convertToDTO(order));
    }

    @GetMapping
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<List<OrderDTO>> getUserOrders() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        
        List<OrderDTO> orders = orderService.getUserOrders(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<List<OrderDTO>> getUserOrdersByStatus(@PathVariable OrderStatus status) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        
        List<OrderDTO> orders = orderService.getUserOrdersByStatus(user, status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<Void> cancelOrder(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow();
        
        Order order = orderService.getOrderById(id);
        if (!order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        orderService.cancelOrder(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/status")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<OrderDTO> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {
        Order order = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(convertToDTO(order));
    }

    private OrderDTO convertToDTO(Order order) {
        List<OrderItemDTO> itemDTOs = order.getOrderItems().stream()
                .map(item -> new OrderItemDTO(
                        item.getId(),
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getPrice(),
                        item.getSubtotal(),
                        item.getProduct().getImageUrl()
                ))
                .collect(Collectors.toList());

        return new OrderDTO(
                order.getId(),
                order.getUser().getId(),
                order.getOrderNumber(),
                order.getTotalAmount(),
                order.getStatus(),
                itemDTOs,
                order.getShippingAddress().getId(),
                order.getCreateTime(),
                order.getPayTime(),
                order.getShipTime(),
                order.getCompleteTime()
        );
    }
} 