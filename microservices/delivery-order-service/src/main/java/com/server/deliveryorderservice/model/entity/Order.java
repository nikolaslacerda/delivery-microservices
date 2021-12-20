package com.server.deliveryorderservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`order`")
public class Order {

    public enum Status {
        SUBMITTED,
        PAID,
        IN_PROGRESS,
        COMPLETED,
        SHIPPED,
        DELIVERED;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDateTime dateTime;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;

    @NotNull
    private Long restaurantId;

    @OneToOne(cascade = CascadeType.PERSIST, optional = false, mappedBy = "order")
    private Delivery delivery;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "order")
    private List<OrderItem> items = new ArrayList<>();

}
