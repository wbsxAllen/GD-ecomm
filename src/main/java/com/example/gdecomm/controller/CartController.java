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

    @GetMapping("/{userId}")
    public CartDTO getCart(@PathVariable Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            cart = new Cart();
            User user = userRepository.findById(userId).orElseThrow();
            cart.setUser(user);
            cart = cartRepository.save(cart);
        }
        List<CartItemDTO> items = cart.getCartItems().stream()
                .map(item -> new CartItemDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getQuantity()
                )).collect(Collectors.toList());
        return new CartDTO(cart.getId(), userId, items);
    }

    @PostMapping("/add")
    public CartDTO addToCart(@RequestParam Long userId, @RequestParam Long productId, @RequestParam Integer quantity) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            cart = new Cart();
            User user = userRepository.findById(userId).orElseThrow();
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
        return getCart(userId);
    }

    @DeleteMapping("/remove")
    public CartDTO removeFromCart(@RequestParam Long userId, @RequestParam Long productId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) return null;
        cart.getCartItems().removeIf(item -> {
            boolean match = item.getProduct().getId().equals(productId);
            if (match) cartItemRepository.delete(item);
            return match;
        });
        cartRepository.save(cart);
        return getCart(userId);
    }

    @PutMapping("/update")
    public CartDTO updateCartItem(@RequestParam Long userId, @RequestParam Long productId, @RequestParam Integer quantity) {
        Cart cart = cartRepository.findByUserId(userId);
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
        return getCart(userId);
    }

    @PostMapping("/clear")
    public CartDTO clearCart(@RequestParam Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) return null;
        cart.getCartItems().forEach(cartItemRepository::delete);
        cart.getCartItems().clear();
        cartRepository.save(cart);
        return getCart(userId);
    }
} 