package com.server.deliveryrestaurantservice.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {

    private String name;
    private Integer userRating;
    private String comment;
    private Long orderId;

}