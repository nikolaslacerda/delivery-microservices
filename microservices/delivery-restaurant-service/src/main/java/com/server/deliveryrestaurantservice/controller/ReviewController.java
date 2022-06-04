package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.response.ReviewAverageResponse;
import com.server.deliveryrestaurantservice.model.dto.response.ReviewResponse;
import com.server.deliveryrestaurantservice.model.dto.request.ReviewRequest;
import com.server.deliveryrestaurantservice.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/restaurants/{restaurantId}/reviews")
    public ReviewResponse createReview(@PathVariable Long restaurantId, @Valid @RequestBody ReviewRequest request) {
        return reviewService.createReview(restaurantId, request);
    }

    @GetMapping("/restaurants/{restaurantId}/reviews")
    public List<ReviewResponse> getReviewsByRestaurantId(@PathVariable("restaurantId") Long restaurantId,
                                                         @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                                         @RequestParam(value = "orderId", required = false) UUID orderId) {
        return reviewService.getReviewsByRestaurantId(restaurantId, page, orderId);
    }

    @GetMapping("/restaurants/{restaurantId}/rating")
    public ReviewAverageResponse getRestaurantRatingAverage(@PathVariable("restaurantId") Long restaurantId) {
        return reviewService.getRestaurantRatingAverage(restaurantId);
    }

}
