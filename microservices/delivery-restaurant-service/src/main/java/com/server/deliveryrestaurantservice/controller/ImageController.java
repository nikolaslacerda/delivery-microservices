package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping(value = "/partners/restaurants/{restaurantId}/image")
    public void createRestaurantImage(@PathVariable Long restaurantId, @RequestParam MultipartFile image) {
        imageService.createRestaurantImage(restaurantId, image);
    }

    @GetMapping(value = "/restaurants/{restaurantId}/image", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getRestaurantImage(@PathVariable Long restaurantId) {
        return imageService.getRestaurantImage(restaurantId);
    }

    @PostMapping(value = "/partners/restaurants/{restaurantId}/items/{itemId}/image")
    public void getMenuItemImage(@PathVariable Long itemId, @RequestParam MultipartFile image) {
        imageService.createMenuItemImage(itemId, image);
    }

    @GetMapping(value = "/restaurants/{restaurantId}/items/{itemId}/image", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> createMenuItemImage(@PathVariable Long itemId) {
        return imageService.getMenuItemImage(itemId);
    }

}
