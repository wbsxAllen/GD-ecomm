package com.example.gdecomm.service;

import com.example.gdecomm.model.Order;
import com.example.gdecomm.model.OrderStatus;
import com.example.gdecomm.model.User;
import com.example.gdecomm.payload.request.CreateOrderRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
    Order createOrder(User user, Long addressId, List<CreateOrderRequest.OrderItemRequest> items);
    Order getOrderById(Long id);
    List<Order> getUserOrders(User user);
    Page<Order> getUserOrdersPage(User user, Pageable pageable);
    List<Order> getUserOrdersByStatus(User user, OrderStatus status);
    List<Order> getAllOrders();
    Order updateOrderStatus(Long orderId, OrderStatus status);
    void cancelOrder(Long orderId);
} 