package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping(value = "restaurants/image/restaurant/{imagePath}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getRestaurantImage(@PathVariable("imagePath") String imagePath) {
        return imageService.getRestaurantImage(imagePath);
    }

    @GetMapping(value = "restaurants/image/menu-item/{imagePath}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getMenuItemImage(@PathVariable("imagePath") String imagePath) {
        return imageService.getMenuItemImage(imagePath);
    }

}
