package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.exception.ResourceNotFoundException;
import com.server.deliveryrestaurantservice.mapper.AddressMapper;
import com.server.deliveryrestaurantservice.mapper.RestaurantMapper;
import com.server.deliveryrestaurantservice.model.dto.request.AddressRequest;
import com.server.deliveryrestaurantservice.model.dto.request.RestaurantRequest;
import com.server.deliveryrestaurantservice.model.dto.response.RestaurantResponse;
import com.server.deliveryrestaurantservice.model.entity.Address;
import com.server.deliveryrestaurantservice.model.entity.Menu;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.repository.AddressRepository;
import com.server.deliveryrestaurantservice.repository.MenuRepository;
import com.server.deliveryrestaurantservice.repository.RestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RestaurantService {

    private final MenuRepository menuRepository;
    private final AddressRepository addressRepository;
    private final RestaurantRepository restaurantRepository;

    public RestaurantResponse createRestaurant(RestaurantRequest restaurant) {
        Address address = insertAddress(restaurant.getAddress());
        Restaurant re = RestaurantMapper.mapToModel(restaurant);
        re.setAddress(address);
        Restaurant createdRestaurant = restaurantRepository.save(re);
        Menu menu = generateRestaurantMenu(createdRestaurant);
        menuRepository.save(menu);
        return RestaurantMapper.mapToDto(createdRestaurant);
    }

    public List<RestaurantResponse> getRestaurants() {
        return restaurantRepository.findAllByActive(true)
                .stream()
                .map(RestaurantMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public RestaurantResponse getRestaurantById(Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);
        return RestaurantMapper.mapToDto(restaurant);
    }

    public RestaurantResponse getRestaurantByUsername(String username) {
        Restaurant restaurant = restaurantRepository.findByUsername(username)
                .orElseThrow(ResourceNotFoundException::new);
        return RestaurantMapper.mapToDto(restaurant);
    }

    public List<RestaurantResponse> getPendingApprovalRestaurants() {
        return restaurantRepository.findAllByActive(false)
                .stream()
                .map(RestaurantMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public RestaurantResponse updateRestaurant(Long restaurantId, RestaurantRequest restaurantRequest) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(ResourceNotFoundException::new);
        Optional.ofNullable(restaurantRequest.getName()).ifPresent(restaurant::setName);
        Optional.ofNullable(restaurantRequest.getDescription()).ifPresent(restaurant::setDescription);
        Optional.ofNullable(restaurantRequest.getDeliveryPrice()).ifPresent(restaurant::setDeliveryPrice);
        Optional.ofNullable(restaurantRequest.getMinDeliveryTime()).ifPresent(restaurant::setMinDeliveryTime);
        Optional.ofNullable(restaurantRequest.getMaxDeliveryTime()).ifPresent(restaurant::setMaxDeliveryTime);
        Restaurant updatedRestaurant = restaurantRepository.save(restaurant);
        return RestaurantMapper.mapToDto(updatedRestaurant);
    }

    public void approveRestaurant(Long id) {
        restaurantRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);
        restaurantRepository.approveById(id);
    }

    private Address insertAddress(AddressRequest address) {
        return addressRepository.save(AddressMapper.mapToModel(address));
    }

    private Menu generateRestaurantMenu(Restaurant createdRestaurant) {
        return Menu.builder()
                .restaurant(createdRestaurant)
                .build();
    }
}
