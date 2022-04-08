package com.server.deliveryrestaurantservice.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {

    private Long id;
    private String name;
    private Integer userRating;
    private String comment;
    private Long orderId;
    private Long restaurantId;
    private LocalDate createdAt;

}
