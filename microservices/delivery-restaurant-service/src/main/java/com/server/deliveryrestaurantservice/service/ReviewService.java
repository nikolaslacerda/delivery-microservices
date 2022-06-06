package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.mapper.ReviewAverageMapper;
import com.server.deliveryrestaurantservice.mapper.ReviewMapper;
import com.server.deliveryrestaurantservice.model.dto.request.ReviewRequest;
import com.server.deliveryrestaurantservice.model.dto.response.ReviewAverageResponse;
import com.server.deliveryrestaurantservice.model.dto.response.ReviewResponse;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.model.entity.Review;
import com.server.deliveryrestaurantservice.repository.RestaurantRepository;
import com.server.deliveryrestaurantservice.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReviewService {

    private final RestaurantRepository restaurantRepository;
    private final ReviewRepository reviewRepository;

    public ReviewResponse createReview(Long restaurantId, ReviewRequest review) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(EntityNotFoundException::new);
        Review savedReview = reviewRepository.save(ReviewMapper.mapToModel(restaurant, review));
        return ReviewMapper.mapToDto(savedReview);
    }

    public List<ReviewResponse> getReviewsByRestaurantId(Long restaurantId, int page, UUID orderId) {
        if (!ObjectUtils.isEmpty(orderId)) {
            return reviewRepository.findByOrderId(orderId)
                    .stream()
                    .map(ReviewMapper::mapToDto)
                    .collect(Collectors.toList());
        }
        return reviewRepository.findAllReviewsByRestaurant(restaurantId, PageRequest.of(page, 10))
                .stream()
                .map(ReviewMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public ReviewAverageResponse getRestaurantRatingAverage(Long restaurantId) {
        Double average = reviewRepository.findRestaurantAverageScore(restaurantId);
        return ReviewAverageMapper.mapToDto(average);
    }
}
