package com.server.deliveryrestaurantservice.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

@Service
public class ImageService {


    public ResponseEntity<byte[]> getRestaurantImage(String imagePath) {
        ClassPathResource imgFile = new ClassPathResource("static/restaurants/" + imagePath);
        try {
            byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(bytes);
        } catch (Exception ex) {
            return null;
        }
    }

    public ResponseEntity<byte[]> getMenuItemImage(String imagePath) {
        ClassPathResource imgFile = new ClassPathResource("static/foods/" + imagePath);
        try {
            byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(bytes);
        } catch (Exception ex) {
            return null;
        }
    }
}
