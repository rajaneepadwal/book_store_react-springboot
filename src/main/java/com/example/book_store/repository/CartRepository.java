package com.example.book_store.repository;

import com.example.book_store.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, Integer> {

    List<CartItem> findByUserId(int userId);

    void deleteByUserId(int userId);
}