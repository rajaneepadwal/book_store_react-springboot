package com.example.book_store.controller;

import com.example.book_store.model.Order;
import com.example.book_store.model.OrderItem;
import com.example.book_store.repository.OrderItemRepository;
import com.example.book_store.repository.OrderRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderController(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }


    @PostMapping
    public Order placeOrder(@RequestBody OrderRequest request) {

        // Create order
        Order order = new Order();

        order.setUserId(request.getUserId());
        order.setTotal(request.getTotal());
        order.setOrderDate(LocalDateTime.now());

        // Save order first
        Order savedOrder = orderRepository.save(order);


        // Save all items belonging to this order
        for (OrderRequestItem item : request.getItems()) {

            OrderItem orderItem = new OrderItem();

            orderItem.setOrderId(savedOrder.getId());
            orderItem.setBookId(item.getBookId());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());

            orderItemRepository.save(orderItem);
        }


        return savedOrder;
    }


    // Request classes
    public static class OrderRequest {

        private int userId;
        private double total;
        private List<OrderRequestItem> items;


        public int getUserId() {
            return userId;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }


        public double getTotal() {
            return total;
        }

        public void setTotal(double total) {
            this.total = total;
        }


        public List<OrderRequestItem> getItems() {
            return items;
        }

        public void setItems(List<OrderRequestItem> items) {
            this.items = items;
        }
    }


    public static class OrderRequestItem {

        private int bookId;
        private int quantity;
        private double price;


        public int getBookId() {
            return bookId;
        }

        public void setBookId(int bookId) {
            this.bookId = bookId;
        }


        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }


        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }
}