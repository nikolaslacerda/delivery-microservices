package com.server.deliveryrestaurantservice.security;

//import com.server.deliveryrestaurantservice.model.entity.Restaurant;
//import com.server.deliveryrestaurantservice.repository.RestaurantRepository;
//import lombok.AllArgsConstructor;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Service;

//@Service
//@AllArgsConstructor
//public class RestaurantAuthorizationService {
//
//    private RestaurantRepository restaurantRepository;
//
//    public boolean checkId(Authentication authentication, long id) {
//        User user = getUserFromAuthentication(authentication);
//        if (user != null && user.isInRole(Role.ROLES.PARTNER)) {
//            Restaurant restaurant = restaurantRepository.findByUserId(user.getId());
//            if (restaurant != null) {
//                return id == restaurant.getId();
//            }
//        }
//        return false;
//    }
//
//    public boolean checkUserId(Authentication authentication, Long userId) {
//        User user = getUserFromAuthentication(authentication);
//        return user != null && user.isInRole(Role.ROLES.PARTNER) && user.getId().equals(userId);
//    }
//
//    private User getUserFromAuthentication(Authentication authentication) {
//        Object principal = authentication.getPrincipal();
//        if (principal instanceof User) {
//            return (User) principal;
//        }
//        return null;
//    }
//
//}
