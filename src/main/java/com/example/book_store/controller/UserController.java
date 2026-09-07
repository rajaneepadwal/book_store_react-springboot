package com.example.book_store.controller;

import com.example.book_store.model.User;
import com.example.book_store.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Registration
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return userRepository.save(user);
    }

    // Login
    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {

        User user = userRepository
                .findByEmail(loginUser.getEmail())
                .orElse(null);

        if (user != null &&
            user.getPassword().equals(loginUser.getPassword())) {

            return user;
        }

        return null;
    }
}