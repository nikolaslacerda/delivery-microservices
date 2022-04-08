package com.server.deliveryrestaurantservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Size(max = 255)
    private String name;

    @Max(5)
    @NotNull
    @PositiveOrZero
    private Integer userRating;

    @NotEmpty
    @Size(max = 255)
    private String comment;

    @NotNull
    private LocalDate createdAt;

    @NotNull
    private Long orderId;

    @ManyToOne
    private Restaurant restaurant;

}
