package com.example.book_store.model;

public class CartResponse {

    private int id;
    private int bookId;
    private String title;
    private String author;
    private String category;
    private double price;
    private String imageUrl;
    private int quantity;

    public CartResponse(
            int id,
            int bookId,
            String title,
            String author,
            String category,
            double price,
            String imageUrl,
            int quantity) {

        this.id = id;
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.category = category;
        this.price = price;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public int getBookId() {
        return bookId;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getCategory() {
        return category;
    }

    public double getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public int getQuantity() {
        return quantity;
    }
}