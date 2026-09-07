package com.example.book_store.controller;

import com.example.book_store.model.Book;
import com.example.book_store.repository.BookRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Get all books
    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Get one book
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable int id) {

        return bookRepository
                .findById(id)
                .orElse(null);
    }

    // Add a book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    // Delete a book
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable int id) {

        bookRepository.deleteById(id);

        return "Book deleted successfully";
    }
}