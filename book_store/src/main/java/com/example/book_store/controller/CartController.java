package com.example.book_store.controller;

import com.example.book_store.model.CartItem;
import com.example.book_store.repository.CartRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    private final CartRepository cartRepository;

    public CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable int userId) {
        return cartRepository.findByUserId(userId);
    }

    @PostMapping
    public CartItem addToCart(@RequestBody CartItem cartItem) {
        return cartRepository.save(cartItem);
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable int id) {
        cartRepository.deleteById(id);
    }

    @DeleteMapping("/user/{userId}")
    public void clearCart(@PathVariable int userId) {
        cartRepository.deleteByUserId(userId);
    }
}