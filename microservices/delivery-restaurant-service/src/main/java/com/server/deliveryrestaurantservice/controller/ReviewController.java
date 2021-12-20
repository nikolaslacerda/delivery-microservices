package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.mapper.ReviewAverageMapper;
import com.server.deliveryrestaurantservice.mapper.ReviewMapper;
import com.server.deliveryrestaurantservice.model.dto.ReviewAverageDto;
import com.server.deliveryrestaurantservice.model.dto.ReviewDto;
import com.server.deliveryrestaurantservice.model.entity.Review;
import com.server.deliveryrestaurantservice.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class ReviewController {

    private ReviewRepository reviewRepository;

    @GetMapping("/restaurants/{restaurantId}/reviews")
    public List<ReviewDto> getReviews(@PathVariable("restaurantId") Long restaurantId) {
        return reviewRepository.findAllReviewsByRestaurant(restaurantId)
                .stream()
                .map(ReviewMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @PostMapping("/restaurants/{restaurantId}/reviews")
    public ReviewDto createReview(@RequestBody Review review) {
        Review savedReview = reviewRepository.save(review);
        return ReviewMapper.mapToDto(savedReview);
    }

    @GetMapping("/restaurants/rating")
    public List<ReviewAverageDto> findAllAverages(@RequestParam("restaurants") List<Long> restaurantIds) {
        List<ReviewAverageDto> averages = new ArrayList<>();
        for (Long restaurantId : restaurantIds) {
            Double average = reviewRepository.findRestaurantAverageScore(restaurantId);
            averages.add(ReviewAverageMapper.mapToDto(restaurantId, average));
        }
        return averages;
    }

}
