package com.example.gdecomm.service.impl;

import com.example.gdecomm.model.*;
import com.example.gdecomm.repository.*;
import com.example.gdecomm.service.OrderService;
import com.example.gdecomm.payload.request.CreateOrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Override
    @Transactional
    public Order createOrder(User user, Long addressId, List<CreateOrderRequest.OrderItemRequest> items) {
        
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        Order order = new Order();
        order.setUser(user);
        order.setOrderNumber(generateOrderNumber());
        order.setShippingAddress(address);
        order.setStatus(OrderStatus.PENDING_PAYMENT);

        BigDecimal totalAmount = BigDecimal.ZERO;
        for (CreateOrderRequest.OrderItemRequest itemRequest : items) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock() < itemRequest.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItem.setSubtotal(product.getPrice().multiply(new BigDecimal(itemRequest.getQuantity())));

            totalAmount = totalAmount.add(orderItem.getSubtotal());

            order.getOrderItems().add(orderItem);

            product.setStock(product.getStock() - itemRequest.getQuantity());
            productRepository.save(product);
        }

        order.setTotalAmount(totalAmount);
        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUserOrderByCreateTimeDesc(user);
    }

    @Override
    public List<Order> getUserOrdersByStatus(User user, OrderStatus status) {
        return orderRepository.findByUserAndStatusOrderByCreateTimeDesc(user, status);
    }

    @Override
    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);

        switch (status) {
            case PAID:
                order.setPayTime(LocalDateTime.now());
                break;
            case SHIPPED:
                order.setShipTime(LocalDateTime.now());
                break;
            case COMPLETED:
                order.setCompleteTime(LocalDateTime.now());
                break;
        }

        return orderRepository.save(order);
    }

    @Override
    @Transactional
    public void cancelOrder(Long orderId) {
        Order order = getOrderById(orderId);
        
        if (order.getStatus() != OrderStatus.PENDING_PAYMENT) {
            throw new RuntimeException("Can only cancel pending payment orders");
        }

        for (OrderItem item : order.getOrderItems()) {
            Product product = item.getProduct();
            product.setStock(product.getStock() + item.getQuantity());
            productRepository.save(product);
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }

    private String generateOrderNumber() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 12);
    }
} 