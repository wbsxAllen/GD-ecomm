package com.example.gdecomm.controller;

import com.example.gdecomm.model.Cart;
import com.example.gdecomm.model.CartItem;
import com.example.gdecomm.model.Product;
import com.example.gdecomm.model.User;
import com.example.gdecomm.payload.dto.CartDTO;
import com.example.gdecomm.payload.dto.CartItemDTO;
import com.example.gdecomm.repository.CartItemRepository;
import com.example.gdecomm.repository.CartRepository;
import com.example.gdecomm.repository.ProductRepository;
import com.example.gdecomm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(auth.getName()).orElseThrow();
    }

    private User getCurrentUserSafe() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            return null;
        }
        return userRepository.findByUsername(auth.getName()).orElse(null);
    }

    @GetMapping
    public CartDTO getCart() {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart = cartRepository.save(cart);
        }
        List<CartItemDTO> items = cart.getCartItems().stream()
                .map(item -> new CartItemDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getProduct().getPrice().doubleValue(),
                        item.getProduct().getImageUrl()
                )).collect(Collectors.toList());
        return new CartDTO(cart.getId(), user.getId(), items);
    }

    @PostMapping("/add")
    public CartDTO addToCart(@RequestParam Long productId, @RequestParam Integer quantity) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart = cartRepository.save(cart);
        }
        Optional<CartItem> existing = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();
        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);
        } else {
            Product product = productRepository.findById(productId).orElseThrow();
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);
            cartItemRepository.save(item);
            cart.getCartItems().add(item);
            cartRepository.save(cart);
        }
        return getCart();
    }

    @DeleteMapping("/remove")
    public CartDTO removeFromCart(@RequestParam Long productId) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) return null;
        cart.getCartItems().removeIf(item -> {
            boolean match = item.getProduct().getId().equals(productId);
            if (match) cartItemRepository.delete(item);
            return match;
        });
        cartRepository.save(cart);
        return getCart();
    }

    @PutMapping("/update")
    public CartDTO updateCartItem(@RequestParam Long productId, @RequestParam Integer quantity) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) return null;
        cart.getCartItems().removeIf(item -> {
            if (item.getProduct().getId().equals(productId)) {
                if (quantity <= 0) {
                    cartItemRepository.delete(item);
                    return true; 
                } else {
                    item.setQuantity(quantity);
                    cartItemRepository.save(item);
                }
            }
            return false;
        });
        cartRepository.save(cart);
        return getCart();
    }

    @PostMapping("/clear")
    public CartDTO clearCart() {
        User user = getCurrentUserSafe();
        if (user == null) {
            throw new RuntimeException("User not found or not authenticated");
        }
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            return new CartDTO(null, user.getId(), new java.util.ArrayList<>());
        }
        cartItemRepository.deleteAll(cart.getCartItems());
        cart.getCartItems().clear();
        cartRepository.save(cart);
        return getCart();
    }
} 