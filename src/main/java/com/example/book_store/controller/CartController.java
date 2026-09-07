package com.example.book_store.controller;

import com.example.book_store.model.Book;
import com.example.book_store.model.CartItem;
import com.example.book_store.model.CartResponse;
import com.example.book_store.repository.BookRepository;
import com.example.book_store.repository.CartRepository;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    private final CartRepository cartRepository;
    private final BookRepository bookRepository;

    public CartController(
            CartRepository cartRepository,
            BookRepository bookRepository) {

        this.cartRepository = cartRepository;
        this.bookRepository = bookRepository;
    }


    /* =========================
       GET USER CART
    ========================= */

    @GetMapping("/{userId}")
    public List<CartResponse> getCart(
            @PathVariable int userId) {

        List<CartItem> cartItems =
                cartRepository.findByUserId(userId);

        List<CartResponse> response =
                new ArrayList<>();


        for (CartItem item : cartItems) {

            Book book =
                    bookRepository
                            .findById(item.getBookId())
                            .orElse(null);

            if (book != null) {

                response.add(
                    new CartResponse(
                        item.getId(),
                        book.getId(),
                        book.getTitle(),
                        book.getAuthor(),
                        book.getCategory(),
                        book.getPrice(),
                        book.getImageUrl(),
                        item.getQuantity()
                    )
                );

            }
        }

        return response;
    }


    /* =========================
       ADD TO CART
    ========================= */

    @PostMapping
    public CartItem addToCart(
            @RequestBody CartItem cartItem) {

        return cartRepository.save(cartItem);
    }


    /* =========================
       REMOVE CART ITEM
    ========================= */

    @DeleteMapping("/{id}")
    public void removeFromCart(
            @PathVariable int id) {

        cartRepository.deleteById(id);
    }


    /* =========================
       CLEAR USER CART
    ========================= */

    @DeleteMapping("/user/{userId}")
    public void clearCart(
            @PathVariable int userId) {

        cartRepository.deleteByUserId(userId);
    }
}